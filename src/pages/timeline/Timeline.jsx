import styles from './timeline.module.scss'
import Card from './components/card'
import Imgcard from './components/Imgcard'

export default function Timeline() {
  return (
    <div>
      <h1 className={styles.heading}>Timeline</h1>
      <div className={styles.title}>
        <div>New Journey</div>
        {/* <div></div>
        <div></div> */}
      </div>

      <div className={styles.timeline}>
        <Card date="Today" desc="Office Meeting" time="8.00 am"></Card>
        <Card
          date="12th March"
          desc="Participate to board meeting for talk about the projects"
          time="10.00 am"></Card>
        <Card date="" desc="Office Meeting" time="8.00 am"></Card>

        <Imgcard
          img="https://images.unsplash.com/photo-1562698013-ac13558052cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1110&q=80"
          date="10th March"
          desc="Travel to Kandy"
          time="10.00 am"></Imgcard>

        <Card date="9th March" desc="Office Meeting" time="8.00 am"></Card>
        <Card date="8th March" desc="Office Meeting" time="8.00 am"></Card>
        <Card date="7th March" desc="Office Meeting" time="8.00 am"></Card>

        <Card date="4th March" desc="Office Meeting" time="8.00 am"></Card>
        <Imgcard
          img="https://images.unsplash.com/flagged/photo-1567498975675-a3adf1574cb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
          desc="Travel to Galle"
          time="10.00 am"></Imgcard>
      </div>
    </div>
  )
}
