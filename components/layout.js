import Head from 'next/head'
import Strategies from './strategies'

export default ({children}) => (
  <div>
    <Head>
      <title>Meter Made Atlanta</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      <link href="https://fonts.googleapis.com/css?family=Homenaje|Muli:400,700" rel="stylesheet" />

      <meta property="og:title" content="How would you improve transportation in Atlanta?" />
      <meta property="og:description" content="Help us choose transportation projects to get as many Atlanta commuters off the road as possible." />
      <meta property="og:url" content="https://metermade.herokuapp.com" />
      <meta property="og:site_name" content="Meter Made Atlanta" />
      <meta property="og:image" content="https://metermade.herokuapp.com/images/facebook-share.png" />
    </Head>
    <div className="container-fluid">
      <header className="row">
        <div className="col-sm-10 offset-sm-1">
          <h1 className="title">Meter Made</h1>
          <img className="logo" src="/images/logo.png" srcSet="/images/logo.png 1x, /images/logo@2x.png 2x" alt="Atlanta's Transportation Plan" />
        </div>
      </header>

      <div className="row introduction">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-center mt-3 mb-1">
              <h2>How would you improve transportation in Atlanta?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 offset-sm-1 col-md-5 offset-md-2">
              <div className="introduction-text">
                <p>You have $5 to spend on transportation projects to get as many commuters off the road as possible. Insert your $5, one dollar at a time, by clicking the meters that you think will make the biggest impact.</p>
                <p>After making your choices with all five of your dollars, the meters will turn to reveal how much congestion your plan will reduce.</p>
                <p>What difference will your meters make? Your responses will be used as input to the Atlanta’s Transportation Plan.</p>
              </div>
            </div>
            <div className="col-sm-4 text-center">
              <img className="logo" src="/images/example.png" srcSet="/images/example.png 1x, /images/example@2x.png 2x" className="example-image" alt="" />
              <div className="example-text">For example, you could put $2 in one choice, $1 in another, and $2 in a third.</div>
            </div>
          </div>
        </div>
      </div>

      { children }
      <div className="row strategies">
        <Strategies />
      </div>

      <footer className="row">
        <div className="col-sm-10 offset-sm-1">
          <img className="logo" src="/images/logo.png" srcSet="/images/logo.png 1x, /images/logo@2x.png 2x" alt="Atlanta's Transportation Plan" />
          <h1 className="title">Meter Made</h1>
        </div>
      </footer>
    </div>
  </div>
)
