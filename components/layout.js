import Head from 'next/head'
import stylesheet from '../styles/style.scss'
import Strategies from './strategies'

export default ({children}) => (
  <div>
    <Head>
      <title>Meter Made Atlanta</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" sizes="192x192" href="/static/favicon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />

      <link href="https://fonts.googleapis.com/css?family=Homenaje|Muli:400,700" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{__html: stylesheet}} />

      <meta property="og:title" content="How would you improve transportation in Atlanta?" />
      <meta property="og:description" content="Help us choose transportation projects to get as many Atlanta commuters off the road as possible." />
      <meta property="og:url" content="https://metermade.herokuapp.com" />
      <meta property="og:site_name" content="Meter Made Atlanta" />
      <meta property="og:image" content="https://metermade.herokuapp.com/static/images/example@2x.png" />
    </Head>
    <div className="container-fluid">
      <header className="row">
        <div className="col-sm-10 col-sm-offset-1">
          <h1 className="title">Meter Made</h1>
          <img className="logo" src="/static/images/logo.png" srcSet="/static/images/logo.png 1x, /static/images/logo@2x.png 2x" alt="Atlanta's Transportation Plan" />
        </div>
      </header>

      <div className="row introduction">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h2>How would you improve transportation in Atlanta?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2">
              <div className="introduction-text">
                <p>You have $5 to spend on transportation projects to get as many commuters off the road as possible. Insert your $5, one dollar at a time, by clicking the meters that you think will make the biggest impact.</p>
                <p>After making your choices with all five of your dollars, the meters will turn to reveal how much congestion your plan will reduce.</p>
                <p>What difference will your meters make?</p>
              </div>
            </div>
            <div className="col-sm-4 text-center">
              <img className="logo" src="/static/images/example.png" srcSet="/static/images/example.png 1x, /static/images/example@2x.png 2x" className="example-image" alt="" />
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
        <div className="col-sm-10 col-sm-offset-1">
          <img className="logo" src="/static/images/logo.png" srcSet="/static/images/logo.png 1x, /static/images/logo@2x.png 2x" alt="Atlanta's Transportation Plan" />
          <h1 className="title">Meter Made</h1>
        </div>
      </footer>
    </div>
  </div>
)
