import React from 'react'
import { AuthContext } from '../../components/AuthContext'
import { packagesSentByUser, userListPackages } from '../../service/user-service'
import Styles from '../../CSS-styles/DesktopDashboardStyle.module.css'
import { Link } from 'react-router-dom'


function UserDashboardDesktop() {

  let loginContext = React.useContext(AuthContext)
  const [incomingPackages, setIncomingPackages] = React.useState([])
  const [createdPackages, setCreatedPackages] = React.useState([])
  const [numOfPackIncoming, setNumOfPackIncoming] = React.useState(0)
  const [numOfSentPacks, setNumOfSentPacks] = React.useState(0)


  React.useEffect(() => {
    userListPackages(loginContext.userData.address)
      .then(data => {
        let receiverPackagesArray = []
        let incPNum = []
        data.forEach(pack => {
          console.log(pack)

          if (pack.receiverAddress == loginContext.userData.address && pack.status != "leadott" && receiverPackagesArray.length < 4) {
            receiverPackagesArray.push(pack)

          } if (pack.receiverAddress == loginContext.userData.address && pack.status != "leadott") {
            incPNum.push(pack)
          }
        })
        setIncomingPackages(receiverPackagesArray)
        setNumOfPackIncoming(incPNum.length)
        console.log(receiverPackagesArray)
      })
  }, [])

  React.useEffect(() => {
    packagesSentByUser(loginContext.userData.userName)
      .then((incomingPackages) => {
        let activePsentByUser = []
        let sentPNum = []
        incomingPackages.forEach(pack => {
          if (activePsentByUser.length < 4) {
            activePsentByUser.push(pack)
          }
          sentPNum.push(pack)

        })
        setCreatedPackages(activePsentByUser)
        setNumOfSentPacks(sentPNum.length)
      })
  }, [])

  return (
    <div className={Styles.GridContainer}>
      <div className={Styles.HeaderAndBody}>
        <div className={Styles.HeaderSection}>
          <h1 className={Styles.Hello}>Hello {loginContext.userData.userName}!</h1>
          <p>RnnR - A k??z??ss??gi csomagk??ld?? alkalmaz??s, ahol b??rki lehet fut??r vagy felad??</p>
        </div>
        <div className={Styles.Body}>

          <div className={Styles.SectionsAndInfo}>
            <div className={Styles.PackInfos}>

              <div className={Styles.SentPacks}>
                <div className={Styles.H2nLink}>
                  <h2>Akt??v ??rkez?? csomagjaid: {numOfPackIncoming}</h2>
                  <Link className={Styles.BlackLink} to="/NekemCimzettCsomagok">??sszes ??rkez?? csomag</Link>
                </div>
                <div className={Styles.LiDiv}>
                  <ul className={`${Styles.SentPUl} ${Styles.Bold}`}>
                    <li>ID:</li>
                    <li>Kateg??ria:</li>
                    <li>St??tusz:</li>
                    <li>L??trehozva:</li>
                  </ul>
                  {incomingPackages.map(packbelongstouser => {
                    return (
                      <ul className={Styles.SentPUl} key={packbelongstouser.id} >
                          <li> {packbelongstouser.id}</li>
                          <li> {packbelongstouser.category}</li>
                           {packbelongstouser.status == "v??rakozik" ? <li>Keres??s folyamatban</li>: <li>{packbelongstouser.runner}</li>}
                          <li> {packbelongstouser.createdAt}</li>
                      </ul>)

                  })}
                </div>
              </div>

              <div className={Styles.SentPacks}>
                <div className={Styles.H2nLink}>
                  <h2>Feladott csomagok: {numOfSentPacks}</h2>
                  <Link className={Styles.BlackLink} to="/FeladottCsomagok">??sszes feladott csomag</Link>
                </div>
                <div className={Styles.LiDiv}>
                  <ul className={`${Styles.SentPUl} ${Styles.Bold}`}>
                    <li>ID:</li>
                    <li>Kateg??ria:</li>
                    <li>St??tusz:</li>
                    <li>L??trehozva:</li>
                  </ul>
                  {createdPackages.map(pack => {
                    return (

                      <ul className={`${Styles.SentPUl} `} key={pack.id}>

                        <li> {pack.id}</li>
                        <li> {pack.category}</li>
                        <li>  {pack.status}</li>

                        <li> {pack.createdAt}</li>
                      </ul>

                    )
                  })}
                </div>
              </div>
            </div>

            <div className={Styles.Info}>
              <div className={Styles.Usefull}>
                <h2>Hasznos inf??k</h2>
                <ul  >
                  <div >
                    <li>Figyelj hogy mindig pontos c??met adj meg</li>
                    <li>L??gy a c??men a csomag felv??teln??l</li>
                    <li>Megfelel??en csomagold be a k??ldem??nyt</li>
                    <li>Menj biztosra, ha lehet ??tv??telkor haszn??ld a QR-k??dos ??tv??telt</li>
                    <li>L??gy kedves a fut??rokkal</li>
                    <li>L??gy t??relmes</li>
                  </div>
                </ul>
              </div>
              <div className={Styles.SideImg}>

              </div>
              <div className={Styles.Contact}>
                <h2>Kapcsolat</h2>
                <ul  >
                  <div >
                    <li><span>E-mail: </span>support@rnnr.hu</li>
                    <li> <span>Telefon: </span>+3611111111</li>
                    <li><span>Sz??kh??z: </span>Budapest, random c??m 1</li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserDashboardDesktop