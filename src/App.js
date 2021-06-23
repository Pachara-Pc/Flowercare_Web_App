import { Row, Col, Card, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import firebase from 'firebase';
import { firebaseConfig } from './config'
import iconF from './icon/F.png'
import iconH from './icon/H.png'
import iconL from './icon/L.png'
import iconT from './icon/T.png'

firebase.initializeApp(firebaseConfig)

const marginText = { margin: "20px 0px 10px 0px" }
const marginImg = { margin: "15px 0px 0px 0px" }
function App() {
  const [Wait, setWait] = useState(false)
  const [AllData, setAllData] = useState([]);
  useEffect(() => {



    getData()

  }, [])

  const getData = () => {

    var database = firebase.database().ref('Sensor')

    database.on('value', snap => {
      // console.log("Hello");
      setAllData(snap.val())
      setWait(true)
      // console.log(snap.val());
    })

    // console.log("hello");
  }

  function waitPage() {

    //  console.log(obj.Sensor_1);
    //  console.log(obj.Sensor_2);
    if (Wait === true) {
      return showDetail(AllData)
    } else {
      return <div>Loading . . .</div>
    }



  }

  function showDetail(data) {

    return Object.entries(data).map(([k, v]) => {

      console.log(k);
      console.log(v);

      return <Card >
        <Card.Header as="h6" style={{ backgroundColor: "#19C75F", color: 'white' }}>{k}</Card.Header>
        <Card.Body>


          <Card.Text >

            <Row xs={2}  sm={4} >
              <Col ><img src={iconF} height="50" style={marginImg} /> </Col>
              <Col style={marginText}> Fertilize : 12 µS/cm  </Col>

              <Col ><img src={iconH} height="50" style={marginImg} /> </Col>
              <Col style={marginText} >  Humidity : {v.Humidity} %  </Col>

              <Col ><img src={iconL} height="50" style={marginImg} /> </Col>
              <Col style={marginText} >  Light : {v.Light} lux   </Col>

              <Col ><img src={iconT} height="50" style={marginImg} /> </Col>
              <Col style={marginText} >  Temp : {v.Temp} &#x2103; </Col>

            </Row>





          </Card.Text>

        </Card.Body>
      </Card>
    })

  }

  return (
    <div >
     

        {waitPage()}


      


    </div>
  );
}

export default App;
