import { useState, useEffect } from "react";
import ScheduleDetails from "../../schedule/ScheduleDetails";

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [midgardFilter, setMidgardFilter] = useState([]);
  const [jotunFilter, setJotunFilter] = useState([]);
  const [vanaFilter, setVanaFilter] = useState([]);

  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked day is already open, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  // Here are we fetching the schedule data form the API, and setting the states of the schedule array.
  // We also filter the schedule array to only show the events that are in the current day.
  useEffect(() => {
    async function getSchedule() {
      const resSchedule = await fetch("https://prototype-masters-foofest.herokuapp.com/schedule");
      const scheduleData = await resSchedule.json();
      setSchedule(scheduleData);
      setMidgardFilter(scheduleData.Midgard.mon);
      setJotunFilter(scheduleData.Jotunheim.mon);
      setVanaFilter(scheduleData.Vanaheim.mon);
    }
    getSchedule();
  }, []);

  // Here are making a array so we can map over them.
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <>
      <main>
        <section>
          <h1>Schedule</h1>
        </section>
        {/* Now to days are being mapped, and we are prop drilling all the states, the day and schedule data */}
        {days.map((daySchedule, index) => (
          <ScheduleDetails
            key={Math.random()}
            schedule={schedule}
            daySchedule={daySchedule}
            midgardFilter={midgardFilter}
            jotunFilter={jotunFilter}
            vanaFilter={vanaFilter}
            setMidgardFilter={setMidgardFilter}
            setJotunFilter={setJotunFilter}
            setVanaFilter={setVanaFilter}
            toggle={toggle}
            clicked={clicked}
            setClicked={setClicked}
            index={index}
          />
        ))}
      </main>
    </>
  );
}
