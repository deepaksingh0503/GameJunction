import Teams from "models/Team";
import connectDb from "../../middleware/connectDB";
import fetchUser from "../../middleware/fetchUser";
import Events from "../../models/Event";
import Users from "../../models/User";

const handler = async (req, res) => {
  let {
    _id,
    title,
    theme,
    details,
    category,
    sport,
    mode,
    platform,
    link,
    location,
    minTeam,
    maxTeam,
    eventDate,
    rewards,
    eligibility,
    poster,
    registrationFee,
    payment_method,
    lastDateOfRegistration,
    contact,
    email,
    website,
    youtube,
    linkedin,
    instagram,
    discord,
    telegram,
    twitter,
    other,
    is_active,
    winner,
    is_featured,
  } = req.body;

  if (req.method == "POST") {
    let existEvent = await Events.findOne({ title });
    if (existEvent) {
      return res.status(500).json({ error: "Event Title Taken!" });
    }
    existEvent = await Events.findOne({
      slug: title.toString().toLowerCase().replaceAll(" ", "-"),
    });
    if (existEvent) {
      return res.status(500).json({ error: "Event Title Taken!" });
    }
    if (
      !(
        Date.now() < new Date(eventDate) &&
        Date.now() < new Date(lastDateOfRegistration) &&
        new Date(eventDate) > new Date(lastDateOfRegistration)
      )
    ) {
      return res.status(400).json({ error: "Invalid Dates" });
    }
    let organiserUser = await Users.findOne({ _id: req.user._id });
    let newEvent = new Events({
      organiserId: organiserUser._id,
      organiserName: organiserUser.name,
      title,
      slug: title.toString().toLowerCase().replaceAll(" ", "-"),
      theme,
      details,
      category,
      poster,
      sport,
      mode,
      platform,
      link,
      location,
      minTeam,
      maxTeam,
      eventDate,
      rewards,
      eligibility,
      registrationFee,
      payment_method,
      lastDateOfRegistration,
      contact,
      email,
      website,
      youtube,
      linkedin,
      instagram,
      discord,
      telegram,
      twitter,
      other,
    });
    await newEvent.save();

    await Users.findByIdAndUpdate(req.user._id, {
      events_organised: [...organiserUser.events_organised, newEvent._id],
      organiser_points: organiserUser.organiser_points + 1,
    });

    return res.status(200).json({ success: "Event Created!" });
  } else if (req.method == "PUT") {
    let existingEvent = await Events.findById(_id);
    let winnerUser = await Users.findOne({ _id: winner });
    let winnerTeam = await Teams.findOne({ _id: winner });
    if (existingEvent.organiserId == req.user._id) {
      if (winnerUser) {
        await Events.findByIdAndUpdate(_id, {
          winner: `${winnerUser.name},${winner}`,
          is_active: false,
        });
        await Users.findOneAndUpdate(
          { _id: winner },
          {
            prices_won: [...winnerUser.prices_won, _id],
            participant_points: winnerUser.participant_points + 10,
          }
        );
        let org = await Users.findById(existingEvent.organiserId);
        await Users.findByIdAndUpdate(existingEvent.organiserId, {
          organiser_points: org.organiser_points + 5,
        });
        return res.status(200).json({ success: "Event Updated!" });
      }
      if (winnerTeam) {
        await Events.findByIdAndUpdate(_id, {
          winner: `${winnerTeam.team_name},${winner}`,
          is_active: false,
        });

        await Teams.findByIdAndUpdate(winner, {
          prices_won: [...winnerTeam.prices_won, _id],
        });

        for await (let e of winnerTeam.participants) {
          let part = await Users.findOne({ email: e.participant_id });
          if (part.invite_accepted) {
            await Users.findOneAndUpdate(
              { email: e.participant_id },
              {
                prices_won: [...part.prices_won, _id],
                participant_points: part.participant_points + 10,
              }
            );
          }
        }

        let org = await Users.findById(existingEvent.organiserId);
        await Users.findByIdAndUpdate(existingEvent.organiserId, {
          organiser_points: org.organiser_points + 5,
        });

        return res.status(200).json({ success: "Event Updated!" });
      }
      await Events.findByIdAndUpdate(_id, {
        theme,
        details,
        link,
        poster,
        contact,
        email,
        website,
        youtube,
        linkedin,
        instagram,
        discord,
        telegram,
        twitter,
        other,
        is_active,
        is_featured,
      });
      if (existingEvent.participants.length == 0) {
        await Events.findByIdAndUpdate(_id, {
          title,
          category,
          sport,
          mode,
          platform,
          location,
          minTeam,
          maxTeam,
          eventDate,
          rewards,
          eligibility,
          registrationFee,
          payment_method,
          lastDateOfRegistration,
          is_edited: true,
        });
      }
      return res.status(200).json({ success: "Event Updated!" });
    } else {
      return res.status(400).json({ error: "Unauthorised" });
    }
  } else if (req.method == "DELETE") {
    let organiserUser = await Users.findOne({ _id: req.user._id });
    if (organiserUser.events_organised.includes(_id)) {
      let existingEvent = await Events.findByIdAndUpdate(_id, {
        is_deleted: true,
      });
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          organiser_points: organiserUser.organiser_points - 1,
        }
      );
      return res.status(200).json({ success: "Event Deleted!" });
    } else {
      return res.status(400).json({ error: "Event doesn't belongs!" });
    }
  } else {
    return res.status(500).json({ error: "Invalid OpCode" });
  }
};

export default connectDb(fetchUser(handler));
