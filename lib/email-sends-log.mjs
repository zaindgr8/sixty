// Local send log for the CRM email log, merged with Brevo events.
// Brevo's statistics feed lags (on 28 Oct 2026, 52 of 355 sends were absent at first;
// on 30 Oct 2026, only 5 of 172 sends were in the feed an hour after sending).
// These rows come from the send logs (Brevo messageIds returned at send time), so the
// CRM shows every send immediately. Brevo events, when they arrive, add delivery/open/
// bounce status on top — a log-only row shows as 'sent', never as delivered.
// NOTE: the 29 Oct second touch to openers has no send log file in the workspace, so
// it is NOT in this log and will not appear until its log is found or Brevo reports it.
export const EMAIL_SENDS = [
  {
    "messageId": "<202610280901.63111053006@smtp-relay.mailin.fr>",
    "email": "carolina@jimenezcounseling.com",
    "subject": "Carolina, missed calls are costing JIMENEZ COUNSELING, PLLC clients",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.21842129603@smtp-relay.mailin.fr>",
    "email": "rick@zuhne.com",
    "subject": "Rick, missed calls are costing Apollo Investment Group listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.95422825256@smtp-relay.mailin.fr>",
    "email": "kirk@agapedevelopment.org",
    "subject": "Kirk, missed calls are costing Agape Development listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.32400693741@smtp-relay.mailin.fr>",
    "email": "angel@angelfultzrealty.com",
    "subject": "Angel, missed calls are costing Angel Fultz Realty listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.62953896196@smtp-relay.mailin.fr>",
    "email": "seth.borland@barvin.com",
    "subject": "Seth, missed calls are costing Langsford Road Capital listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.66969749819@smtp-relay.mailin.fr>",
    "email": "mmartinez@bayada.com",
    "subject": "Mary, missed calls are costing Beam Investment Group listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.14665424769@smtp-relay.mailin.fr>",
    "email": "beth@bethwolff.com",
    "subject": "Beth, missed calls are costing Beth Wolff Realtors listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.67784750240@smtp-relay.mailin.fr>",
    "email": "bill.bexley@bexleyrealtygroup.com",
    "subject": "Bill, missed calls are costing Bexley Realty Group, Brokered by eXp Realty listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.56622756249@smtp-relay.mailin.fr>",
    "email": "diana@birdy.com",
    "subject": "Diana, missed calls are costing Birdy Properties listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.73814743345@smtp-relay.mailin.fr>",
    "email": "kelly@bridgegrouptx.com",
    "subject": "Kelly, missed calls are costing The Bridge Group listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.63590874913@smtp-relay.mailin.fr>",
    "email": "melanie@camelothouston.com",
    "subject": "Melanie, missed calls are costing Camelot Realty listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.82391649436@smtp-relay.mailin.fr>",
    "email": "cesar.mendoza@pillartopost.com",
    "subject": "Cesar, missed calls are costing Pillar to Post Home Inspectors - Mendoza Team listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.25538128748@smtp-relay.mailin.fr>",
    "email": "mary@circahouston.com",
    "subject": "Mary, missed calls are costing Circa Houston Group - ROA listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.65095979377@smtp-relay.mailin.fr>",
    "email": "amy@cityscapebrokers.com",
    "subject": "Amy, missed calls are costing Cityscape Brokers listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.16348834272@smtp-relay.mailin.fr>",
    "email": "ttrovato@creativeinteriorhomestaging.com",
    "subject": "Tammy, missed calls are costing Creative Interior Home Staging, LLC listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.66565715957@smtp-relay.mailin.fr>",
    "email": "mark@bayoucitysteam.com",
    "subject": "Mark, missed calls are costing Curated Texas Property listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.93770679667@smtp-relay.mailin.fr>",
    "email": "mark@davis-commercial.com",
    "subject": "Mark, missed calls are costing Davis Commercial Real Estate listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.21712472163@smtp-relay.mailin.fr>",
    "email": "jon@dealco.net",
    "subject": "Jon, missed calls are costing Winter Street Studios, Beavers Houston, El Patio listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280901.84637406973@smtp-relay.mailin.fr>",
    "email": "william_elliott@kindermorgan.com",
    "subject": "William, missed calls are costing Deal Findrs listings",
    "sent_at": "2026-10-28T09:01:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.99636073098@smtp-relay.mailin.fr>",
    "email": "adeiso@deisomoss.com",
    "subject": "Andrew, missed calls are costing DeisoMoss listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.67349791301@smtp-relay.mailin.fr>",
    "email": "katie@delmontehtx.com",
    "subject": "Katie, missed calls are costing Del Monte Realty HTX listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.89995544260@smtp-relay.mailin.fr>",
    "email": "casey@delmontehtx.com",
    "subject": "Casey, missed calls are costing Del Monte Realty HTX listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.48574444718@smtp-relay.mailin.fr>",
    "email": "brandi@diversecity.us",
    "subject": "Brandi, missed calls are costing DiverseCity Realty listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.91171113588@smtp-relay.mailin.fr>",
    "email": "raymond@drcashhomebuyers.com",
    "subject": "Raymond, missed calls are costing Dr Cash Home Buyers listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.83556800175@smtp-relay.mailin.fr>",
    "email": "anan@dunyha.com",
    "subject": "Anan, missed calls are costing Dunyha listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.71500085792@smtp-relay.mailin.fr>",
    "email": "manuel@whitepicketrealty.com",
    "subject": "Manuel, missed calls are costing Eagle Property Management LLC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.95194720679@smtp-relay.mailin.fr>",
    "email": "carlb@eaglere.com",
    "subject": "Carl, missed calls are costing Eagle, Realtors listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.24649728180@smtp-relay.mailin.fr>",
    "email": "emily@emilycovey.com",
    "subject": "Emily, missed calls are costing Emily Covey Properties listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.57430889510@smtp-relay.mailin.fr>",
    "email": "jennifer@erwingrealty.com",
    "subject": "Jennifer, missed calls are costing Erwing Realty, LLC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.21730862791@smtp-relay.mailin.fr>",
    "email": "mlashak@accessopartners.com",
    "subject": "Max, missed calls are costing Eshkol Properties listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.97347825332@smtp-relay.mailin.fr>",
    "email": "cbraun@fifthcorner.com",
    "subject": "Chad, missed calls are costing Fifth Corner listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.92381895886@smtp-relay.mailin.fr>",
    "email": "ruthgracey@greathoustonproperties.com",
    "subject": "Ruth, missed calls are costing Great Houston Properties, LLC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.23601006559@smtp-relay.mailin.fr>",
    "email": "leon@greenresidential.com",
    "subject": "Leon, missed calls are costing Green Residential listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.71546145672@smtp-relay.mailin.fr>",
    "email": "timothy@hampsonproperties.com",
    "subject": "Timothy, missed calls are costing Hampson Properties listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.39171961415@smtp-relay.mailin.fr>",
    "email": "mahir@happenhouston.com",
    "subject": "Mahir, missed calls are costing Sixth Sense Real Estate listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.51548063183@smtp-relay.mailin.fr>",
    "email": "david@herzoghomes.com",
    "subject": "David, missed calls are costing Herzog Homes, LLC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.56406342822@smtp-relay.mailin.fr>",
    "email": "jrichardson@hometowntitletx.com",
    "subject": "Jacob, missed calls are costing Hometown Title listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.69371605704@smtp-relay.mailin.fr>",
    "email": "jake@homevelopers.com",
    "subject": "Jake, missed calls are costing Homevelopers listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.67176256224@smtp-relay.mailin.fr>",
    "email": "therese@houstonianproperties.com",
    "subject": "Therese, missed calls are costing Houstonian Properties listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.64236122907@smtp-relay.mailin.fr>",
    "email": "steven@houstonlivinghomes.com",
    "subject": "Steven, missed calls are costing Houston Living Group-Real Estate listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.89114900947@smtp-relay.mailin.fr>",
    "email": "jerry@jerryfullerton.com",
    "subject": "Jerry, missed calls are costing Jerry Fullerton Realty listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.49406344498@smtp-relay.mailin.fr>",
    "email": "jessie@jsinghhomes.com",
    "subject": "Jessie, missed calls are costing JSingh Homes listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.89887342069@smtp-relay.mailin.fr>",
    "email": "reed.vestal@junctionusa.com",
    "subject": "Reed, missed calls are costing Junction Commercial Real Estate listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.68020147559@smtp-relay.mailin.fr>",
    "email": "lisas@kengroup.com",
    "subject": "Lisa, missed calls are costing Kensington Group listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.43946156094@smtp-relay.mailin.fr>",
    "email": "bbalderas@lionsgaterealty.com",
    "subject": "Brizeida, missed calls are costing Lions Gate Realty listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.89271676924@smtp-relay.mailin.fr>",
    "email": "mark.lappin@listingdoor.com",
    "subject": "Mark, missed calls are costing ListingDoor.com listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.66576035080@smtp-relay.mailin.fr>",
    "email": "cmills@llanorealty.com",
    "subject": "Cullen, missed calls are costing Llano Realty Partners listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.41076194984@smtp-relay.mailin.fr>",
    "email": "scottr@pipelinerealty.com",
    "subject": "Scott, missed calls are costing Local Office listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.34627244027@smtp-relay.mailin.fr>",
    "email": "julie@lynrealtytexas.com",
    "subject": "Julie, missed calls are costing Lyn Realty, LLC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.63493816763@smtp-relay.mailin.fr>",
    "email": "hydie@mcalisterassets.com",
    "subject": "Hydie, missed calls are costing McAlister Assets, LLC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.38873626304@smtp-relay.mailin.fr>",
    "email": "michael@mccartybmx.com",
    "subject": "Michael, missed calls are costing 808re Solutions listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.72567746334@smtp-relay.mailin.fr>",
    "email": "sarah.montgomery@pnc.com",
    "subject": "Sarah, missed calls are costing Merit Living Companies listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.87993765972@smtp-relay.mailin.fr>",
    "email": "kmoczulski@mmprop.com",
    "subject": "Kenneth, missed calls are costing M-M Properties listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.75598108712@smtp-relay.mailin.fr>",
    "email": "nmagon@ninamagon.com",
    "subject": "Nina, missed calls are costing KA Residences listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.69478817492@smtp-relay.mailin.fr>",
    "email": "tara.oliver@oliver-cre.com",
    "subject": "Tara, missed calls are costing Oliver Partners listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.52367743061@smtp-relay.mailin.fr>",
    "email": "zeeshan.jivani@postoaktitle.com",
    "subject": "Zeeshan, missed calls are costing Post Oak Title listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.75962022474@smtp-relay.mailin.fr>",
    "email": "joel@ppshousebuyers.com",
    "subject": "Joel, missed calls are costing PPS House Buyers listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.21412027313@smtp-relay.mailin.fr>",
    "email": "patti@preferredmgt.com",
    "subject": "Patti, missed calls are costing Preferred Management Services AAMC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.67431362937@smtp-relay.mailin.fr>",
    "email": "zameer@premierglobalequity.com",
    "subject": "Zameer, missed calls are costing Platinum Premier Global Equity listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.83902048673@smtp-relay.mailin.fr>",
    "email": "adam.raffle@raffleparking.com",
    "subject": "Adam, missed calls are costing Raffle Parking Company, LLC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.65451199216@smtp-relay.mailin.fr>",
    "email": "randall@randalldavis.com",
    "subject": "Randall, missed calls are costing Randall Davis Company listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.38702756392@smtp-relay.mailin.fr>",
    "email": "shawn@realestatehouston.com",
    "subject": "Shawn, missed calls are costing Shawn Manderscheid Team | Top Houston Heights Realtors listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.49575444927@smtp-relay.mailin.fr>",
    "email": "walker@realtywalk.com",
    "subject": "Ray, missed calls are costing RealtyWalk listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280902.67731151099@smtp-relay.mailin.fr>",
    "email": "norma@reddoorrgv.com",
    "subject": "Norma, missed calls are costing Red Door Real Estate Services, LLC listings",
    "sent_at": "2026-10-28T09:02:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.26110636020@smtp-relay.mailin.fr>",
    "email": "swise@refuelevs.com",
    "subject": "Scott, missed calls are costing Refuel Electric Vehicle Solutions | REVS listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.19071906001@smtp-relay.mailin.fr>",
    "email": "jw@reootx.com",
    "subject": "John, missed calls are costing Real Estate Options Of Texas listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.64587850471@smtp-relay.mailin.fr>",
    "email": "jlowe@rgvsp.com",
    "subject": "J, missed calls are costing Lowe Unlimited Inc dba Signature Properties listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.82780976767@smtp-relay.mailin.fr>",
    "email": "andyweiner@rockstep.com",
    "subject": "Andy, missed calls are costing RockStep Capital listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.18536961645@smtp-relay.mailin.fr>",
    "email": "jrubin@ropelpaso.com",
    "subject": "Gerald, missed calls are costing River Oaks Properties listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.39050715119@smtp-relay.mailin.fr>",
    "email": "femirogers@rostoninvestment.com",
    "subject": "Femi, missed calls are costing ROSTON GROUP listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.67524003610@smtp-relay.mailin.fr>",
    "email": "rurech@rycorecapital.com",
    "subject": "Ryan, missed calls are costing Rycore Commercial LLC listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.21117080835@smtp-relay.mailin.fr>",
    "email": "clairer@sandnsea.com",
    "subject": "Claire, missed calls are costing Sand 'N Sea Properties, LLC listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.88583211113@smtp-relay.mailin.fr>",
    "email": "matt@searcherscapital.com",
    "subject": "Matt, missed calls are costing Searchers Capital listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.43500910621@smtp-relay.mailin.fr>",
    "email": "landon@sellerfinanceme.com",
    "subject": "Landon, missed calls are costing SellerFinanceMe.Com listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.31931803639@smtp-relay.mailin.fr>",
    "email": "juliana@southhausliving.com",
    "subject": "Juliana, missed calls are costing SOUTH HAUS LIVING, LLC listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.70370334877@smtp-relay.mailin.fr>",
    "email": "minor@taylorlandinvestments.com",
    "subject": "Minor, missed calls are costing Taylor Land Investments Real Estate listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.91242633921@smtp-relay.mailin.fr>",
    "email": "bmengden@terraresidential.com",
    "subject": "Bridget, missed calls are costing Terra Residential Services, Inc. CRMC® listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.77483333861@smtp-relay.mailin.fr>",
    "email": "andrew@texashomelocators.com",
    "subject": "Andrew, missed calls are costing Texas Home Locators listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.50405642644@smtp-relay.mailin.fr>",
    "email": "slerner@trccapitalpartners.com",
    "subject": "Steven, missed calls are costing TRC Capital Partners, LLC listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.69651762936@smtp-relay.mailin.fr>",
    "email": "jessica@triohoa.com",
    "subject": "Jessica, missed calls are costing Trio Homeowners Association Management listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.11711356947@smtp-relay.mailin.fr>",
    "email": "bcarter@carterusa.com",
    "subject": "Brian, missed calls are costing Trust Real Estate listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.31350171679@smtp-relay.mailin.fr>",
    "email": "sh@pearlriverco.com",
    "subject": "Spencer, missed calls are costing Upperline listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.55493319269@smtp-relay.mailin.fr>",
    "email": "l.williams@hp.com",
    "subject": "LaKienya, missed calls are costing Virtual Assistant Key listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.61193411117@smtp-relay.mailin.fr>",
    "email": "sjones@welcomegroup.com",
    "subject": "Shauna, missed calls are costing Welcome Group, LLC listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.67503792157@smtp-relay.mailin.fr>",
    "email": "nicole@wicked-holdings.com",
    "subject": "Nicole, missed calls are costing Wicked Holdings, LLC listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.97892274767@smtp-relay.mailin.fr>",
    "email": "ks@williamsburgent.com",
    "subject": "Khaled, missed calls are costing Williamsburg Enterprises Ltd. listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.80634547721@smtp-relay.mailin.fr>",
    "email": "gwomack@womackdevelopment.com",
    "subject": "Gerald, missed calls are costing Womack Development & Investment Realtors, Inc. listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.57950267452@smtp-relay.mailin.fr>",
    "email": "kristi@womenceoproject.com",
    "subject": "Mrs., missed calls are costing Velox Valuations - Houston listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.19361366183@smtp-relay.mailin.fr>",
    "email": "kaitlyn.shultz@megafood.com",
    "subject": "Kaitlyn, missed calls are costing Digital Realty listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.78826682628@smtp-relay.mailin.fr>",
    "email": "ealonso@starbucks.com",
    "subject": "Elizabeth, missed calls are costing District Property Management listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.67075897703@smtp-relay.mailin.fr>",
    "email": "stuart.meyers@meyersgroup.net",
    "subject": "Stuart, missed calls are costing Meyers Group listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.42304987573@smtp-relay.mailin.fr>",
    "email": "tom@swift-pix.com",
    "subject": "Tom, missed calls are costing SwiftPix Real Estate Photography listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.68022117168@smtp-relay.mailin.fr>",
    "email": "jose.gonzalez@feci.com",
    "subject": "Jose, missed calls are costing GLC Real Estate Inc. listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.87940304807@smtp-relay.mailin.fr>",
    "email": "michael@totalbrokerage.com",
    "subject": "Michael, missed calls are costing TotalBrokerage listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.26195778999@smtp-relay.mailin.fr>",
    "email": "emily@zqrealty.com",
    "subject": "Emily, missed calls are costing Zenquest Realty listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.82509176746@smtp-relay.mailin.fr>",
    "email": "liana@klerigirealty.com",
    "subject": "Liana, missed calls are costing Klerigi Realty listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.17645002631@smtp-relay.mailin.fr>",
    "email": "agrossmann@bhsusa.com",
    "subject": "Aileen, missed calls are costing Lotus Realty listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.82833509785@smtp-relay.mailin.fr>",
    "email": "solangel.fumero@compass.com",
    "subject": "Solangel, missed calls are costing SOL REALTY listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.23540860928@smtp-relay.mailin.fr>",
    "email": "j_cox@federatedcompanies.com",
    "subject": "Jonathan, missed calls are costing The Federated Companies listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.36977047724@smtp-relay.mailin.fr>",
    "email": "dcadet@ymprealestate.com",
    "subject": "Diana, missed calls are costing Cadet Property & Association Management listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.71716315320@smtp-relay.mailin.fr>",
    "email": "nick@valenciahome.com",
    "subject": "Nick, missed calls are costing Valencia Home listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.24078710851@smtp-relay.mailin.fr>",
    "email": "rema@remalee.com",
    "subject": "Rema, missed calls are costing Real World Realty listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.95365799689@smtp-relay.mailin.fr>",
    "email": "joseph@18main.com",
    "subject": "Joseph, missed calls are costing Ammar Group listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.24121673033@smtp-relay.mailin.fr>",
    "email": "jaime@1on1realestate.com",
    "subject": "Jaime, missed calls are costing 1 on 1 Real Estate LLC listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.92067319264@smtp-relay.mailin.fr>",
    "email": "evelynavila@21cig.com",
    "subject": "Evelyn, missed calls are costing 21 CIG listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.18765616950@smtp-relay.mailin.fr>",
    "email": "jbailey@49units.com",
    "subject": "Jesse, missed calls are costing 49 Units listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.98779293353@smtp-relay.mailin.fr>",
    "email": "jgollinger@acceleratedmp.com",
    "subject": "Jon, missed calls are costing Accelerated Marketing Partners listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280903.73317217811@smtp-relay.mailin.fr>",
    "email": "adriana@firsttitlegroup.com",
    "subject": "ADRIANA, missed calls are costing First Title Group Inc. listings",
    "sent_at": "2026-10-28T09:03:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.34069864392@smtp-relay.mailin.fr>",
    "email": "michaelm@addisonreserve.cc",
    "subject": "Michael, missed calls are costing Addison Reserve Country Club listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.42779515808@smtp-relay.mailin.fr>",
    "email": "madler@adler-partners.com",
    "subject": "Matthew, missed calls are costing Adler Real Estate Partners, LLC listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.94454306703@smtp-relay.mailin.fr>",
    "email": "dadler@adlergroup.com",
    "subject": "David, missed calls are costing Adler Group, Inc. listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.76806063112@smtp-relay.mailin.fr>",
    "email": "david@advenirliving.com",
    "subject": "David, missed calls are costing Advenir Azora listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.77418461122@smtp-relay.mailin.fr>",
    "email": "albertov@aldirealestate.com",
    "subject": "Alberto, missed calls are costing Aldi Real Estate listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.95228070045@smtp-relay.mailin.fr>",
    "email": "vbombalier@allenmorris.com",
    "subject": "Virginia, missed calls are costing The Allen Morris Company listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.95252542951@smtp-relay.mailin.fr>",
    "email": "ronetto@altadevelopers.com",
    "subject": "Raimundo, missed calls are costing Alta Developers listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.36593335204@smtp-relay.mailin.fr>",
    "email": "jaltman@altmancos.com",
    "subject": "Joel, missed calls are costing The Altman Companies listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.43492680666@smtp-relay.mailin.fr>",
    "email": "sdionne@altmancos.com",
    "subject": "Suzan, missed calls are costing The Altman Companies listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.77061476851@smtp-relay.mailin.fr>",
    "email": "daniel@miamirealtynetwork.com",
    "subject": "Daniel, missed calls are costing Rent Portfolio listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.67292132140@smtp-relay.mailin.fr>",
    "email": "sillia@apartmentleaseupexperts.com",
    "subject": "Santiago, missed calls are costing Apartment Lease Up Experts listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.55368272753@smtp-relay.mailin.fr>",
    "email": "michael@aresbrokerage.com",
    "subject": "Michael, missed calls are costing A Real Estate Solution listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.49753086259@smtp-relay.mailin.fr>",
    "email": "prubacha@ashleycapital.com",
    "subject": "Paul, missed calls are costing Ashley Capital listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.47417096377@smtp-relay.mailin.fr>",
    "email": "devir@barkbuildings.com",
    "subject": "Devir, missed calls are costing Bark Buildings listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.87797729496@smtp-relay.mailin.fr>",
    "email": "danit@barkbuildings.com",
    "subject": "Danit, missed calls are costing Bark Buildings listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.42601031123@smtp-relay.mailin.fr>",
    "email": "jlevan@bbxcapital.com",
    "subject": "Jarett, missed calls are costing BBX Capital listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.49176366643@smtp-relay.mailin.fr>",
    "email": "michelle@bellevhomes.com",
    "subject": "michelle, missed calls are costing Belle Vie Home Solutions listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.22445160009@smtp-relay.mailin.fr>",
    "email": "ale@belonghome.com",
    "subject": "Ale, missed calls are costing Belong listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.54006899436@smtp-relay.mailin.fr>",
    "email": "tyler@belonghome.com",
    "subject": "Tyler, missed calls are costing Belong listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.31698794684@smtp-relay.mailin.fr>",
    "email": "owen@belonghome.com",
    "subject": "Owen, missed calls are costing Belong listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.59375670793@smtp-relay.mailin.fr>",
    "email": "asciortino@bettinaequities.com",
    "subject": "Alex, missed calls are costing Bettina Equities Management LLC listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.93908585627@smtp-relay.mailin.fr>",
    "email": "brandon@bgluxeproperties.com",
    "subject": "Brandon, missed calls are costing B&G Luxe Properties LLC listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.96689906515@smtp-relay.mailin.fr>",
    "email": "john.carrafiell@bentallgreenoak.com",
    "subject": "John, missed calls are costing BGO listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.85167250113@smtp-relay.mailin.fr>",
    "email": "martina.barry@bentallgreenoak.com",
    "subject": "Martina, missed calls are costing BGO listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.21667326954@smtp-relay.mailin.fr>",
    "email": "rami@biggerequity.com",
    "subject": "Rami, missed calls are costing BiggerEquity listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.82355231327@smtp-relay.mailin.fr>",
    "email": "mbibr@biscaynere.com",
    "subject": "Michal, missed calls are costing Biscayne Real Estate listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.90533226187@smtp-relay.mailin.fr>",
    "email": "jescobar@blacksalmon.com",
    "subject": "Jorge, missed calls are costing Black Salmon Capital listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.56832529102@smtp-relay.mailin.fr>",
    "email": "chris@justhinkit.com",
    "subject": "Chris, missed calls are costing BlueNest.ai listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.20625645196@smtp-relay.mailin.fr>",
    "email": "contact@blueonerealty.com",
    "subject": "Natalia, missed calls are costing BLUE ONE Realty listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.88386636998@smtp-relay.mailin.fr>",
    "email": "gloria@bocaexpert.com",
    "subject": "Gloria, missed calls are costing Boca Expert Realty LLC listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.40096132040@smtp-relay.mailin.fr>",
    "email": "matan@brennerrealestate.com",
    "subject": "Matan, missed calls are costing Brenner Real Estate listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.30371224324@smtp-relay.mailin.fr>",
    "email": "griggs@brickellparkcapital.com",
    "subject": "George, missed calls are costing Brickell Park Capital listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.13616202107@smtp-relay.mailin.fr>",
    "email": "emmanuel@brightwavecapital.com",
    "subject": "Emmanuel, missed calls are costing BrightWave Capital listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.64432526532@smtp-relay.mailin.fr>",
    "email": "moisesdasilva@brivincorp.com",
    "subject": "Moises, missed calls are costing Foreclosure Deals listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.32235998833@smtp-relay.mailin.fr>",
    "email": "idiaz@groupp6.com",
    "subject": "Ignacio, missed calls are costing Brora Capital listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.56991508738@smtp-relay.mailin.fr>",
    "email": "martin.vazquez@bungalow.com",
    "subject": "Martin, missed calls are costing Bungalow listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.81446642201@smtp-relay.mailin.fr>",
    "email": "michael@buromiami.com",
    "subject": "Michael, missed calls are costing Büro listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.72251798811@smtp-relay.mailin.fr>",
    "email": "cmartinez@candctitle.com",
    "subject": "Carolyn, missed calls are costing C & C TITLE AGENCY INC. listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.28407380133@smtp-relay.mailin.fr>",
    "email": "luciana@carvalhocre.com",
    "subject": "Luciana, missed calls are costing Carvalho Luxury International Realty listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.49019416973@smtp-relay.mailin.fr>",
    "email": "dcollins@ups.com",
    "subject": "DARRYLE, missed calls are costing CBG Home Inspections LLC listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.67960796691@smtp-relay.mailin.fr>",
    "email": "jaquanne.peterson@cbre.com",
    "subject": "Jaquanne, missed calls are costing CBRE listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.51916083519@smtp-relay.mailin.fr>",
    "email": "elizabeth.rogerio@cbre.com",
    "subject": "Elizabeth, missed calls are costing CBRE listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.14507518813@smtp-relay.mailin.fr>",
    "email": "kreina@ccmcnet.com",
    "subject": "Kim, missed calls are costing CCMC listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280904.58053151461@smtp-relay.mailin.fr>",
    "email": "cperry@centerlineca.com",
    "subject": "Craig, missed calls are costing Centerline Capital Advisors listings",
    "sent_at": "2026-10-28T09:04:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.21847647881@smtp-relay.mailin.fr>",
    "email": "asua@cgrflorida.com",
    "subject": "Astrith, missed calls are costing Capital Group Realty of Delray listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.50469929266@smtp-relay.mailin.fr>",
    "email": "portia@cirifl.com",
    "subject": "Portia, missed calls are costing Campbell Investment Realty, Inc listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.89336354753@smtp-relay.mailin.fr>",
    "email": "mauricio@cityhouse.us",
    "subject": "Mauricio, missed calls are costing Cityhouse listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.71025880860@smtp-relay.mailin.fr>",
    "email": "sscher@clarocorp.com",
    "subject": "Sandor, missed calls are costing Claro Development listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.67286626853@smtp-relay.mailin.fr>",
    "email": "mg@cleanspaceonline.com",
    "subject": "Matt, missed calls are costing Clean Space Commercial Cleaning listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.62376475633@smtp-relay.mailin.fr>",
    "email": "Mcoletti@colettidevgroup.com",
    "subject": "Michael, missed calls are costing COLETTI DEVELOPMENT GROUP INC. listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.94479208676@smtp-relay.mailin.fr>",
    "email": "jburgos@colwenhotels.com",
    "subject": "Juan, missed calls are costing Colwen Hotels listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.59346483611@smtp-relay.mailin.fr>",
    "email": "dayanne.costa@compass.com",
    "subject": "Dayanne, missed calls are costing 3d Luxy Tours listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.33631130356@smtp-relay.mailin.fr>",
    "email": "damian.kosydar@compass.com",
    "subject": "Damian, missed calls are costing icloze listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.21650167204@smtp-relay.mailin.fr>",
    "email": "john@conceptproperty.com",
    "subject": "John, missed calls are costing Concept Property Management listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.12769031024@smtp-relay.mailin.fr>",
    "email": "christine.caraccia@concordhotels.com",
    "subject": "Christine, missed calls are costing Concord Hospitality Enterprises listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.74815656988@smtp-relay.mailin.fr>",
    "email": "tracie@copelandcompany.com",
    "subject": "Tracie, missed calls are costing Copeland & Co. Real Estate listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.46998449797@smtp-relay.mailin.fr>",
    "email": "khalid.williams@cwservices.com",
    "subject": "Khalid, missed calls are costing C&W Services listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.80005068945@smtp-relay.mailin.fr>",
    "email": "bradley.colmer@decocapital.com",
    "subject": "Bradley, missed calls are costing Deco Capital Group, LLC listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.75568988741@smtp-relay.mailin.fr>",
    "email": "sguasch@definedcos.com",
    "subject": "Steven, missed calls are costing Defined Companies listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.24038829261@smtp-relay.mailin.fr>",
    "email": "kanwaljit@dhunnacapital.com",
    "subject": "Kanwaljit, missed calls are costing Dhunna Capital listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.44327386504@smtp-relay.mailin.fr>",
    "email": "crodriguez@driftwoodcapital.com",
    "subject": "Carlos, missed calls are costing Driftwood Capital listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.21448971233@smtp-relay.mailin.fr>",
    "email": "hope.diaz@eastcoastfacilities.com",
    "subject": "Hope, missed calls are costing East Coast Facilities, Inc. listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.34480005064@smtp-relay.mailin.fr>",
    "email": "frank.espinosa@elandis.com",
    "subject": "Frank, missed calls are costing Elandis listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.17757693934@smtp-relay.mailin.fr>",
    "email": "teo@eliteoceanviewrealty.com",
    "subject": "Teo, missed calls are costing ELITE OCEAN VIEW REALTY LLC listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.45299267789@smtp-relay.mailin.fr>",
    "email": "ryan.farbstein@elliman.com",
    "subject": "Ryan, missed calls are costing The Farbstein Team at Douglas Elliman Real Estate listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.82427170576@smtp-relay.mailin.fr>",
    "email": "yoni.cooperberg@elliman.com",
    "subject": "Yoni, missed calls are costing Douglas Elliman listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.31118172671@smtp-relay.mailin.fr>",
    "email": "kevin@epicfloridahomes.com",
    "subject": "Kevin, missed calls are costing Empire Builder Capital listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.84699052044@smtp-relay.mailin.fr>",
    "email": "cynthia@empiretitleservices.com",
    "subject": "Cynthia, missed calls are costing Empire Title Services, LLC listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.51166633936@smtp-relay.mailin.fr>",
    "email": "d.babanin@iqosa.com",
    "subject": "Dmitry, missed calls are costing Envy Maison listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.77032151005@smtp-relay.mailin.fr>",
    "email": "noel@epelboim.com",
    "subject": "Noel, missed calls are costing EPELBOIM listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.18449638373@smtp-relay.mailin.fr>",
    "email": "curbshott@equigrowth.com",
    "subject": "Chad, missed calls are costing Equigrowth Capital listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.24389442938@smtp-relay.mailin.fr>",
    "email": "eric@erafit.com",
    "subject": "Eric, missed calls are costing ERA Fit listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.77916269014@smtp-relay.mailin.fr>",
    "email": "sicuso.d@ewm.com",
    "subject": "Denise, missed calls are costing  listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.87342950383@smtp-relay.mailin.fr>",
    "email": "wfairman@fairmanassociates.com",
    "subject": "William, missed calls are costing Fairman & Associates, Inc. listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.74518334115@smtp-relay.mailin.fr>",
    "email": "ricardo@fincapitalinvestments.com",
    "subject": "Ricardo, missed calls are costing Fincapital Investments listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.20293783046@smtp-relay.mailin.fr>",
    "email": "nathalia@fincapitalinvestments.com",
    "subject": "Nathalia, missed calls are costing Fincapital Investments listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.96127737181@smtp-relay.mailin.fr>",
    "email": "david@fir.com",
    "subject": "David, missed calls are costing  listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.61556485591@smtp-relay.mailin.fr>",
    "email": "marco@firsttitlegroup.com",
    "subject": "Marco, missed calls are costing First Title Group Inc. listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.67723065372@smtp-relay.mailin.fr>",
    "email": "embar@fltitleclosings.com",
    "subject": "Embar, missed calls are costing Florida Real Estate Title & Closings, Inc. listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.93111702208@smtp-relay.mailin.fr>",
    "email": "zach@flyingpointre.com",
    "subject": "Zach, missed calls are costing Flying Point listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.69370175291@smtp-relay.mailin.fr>",
    "email": "srenard@fortuneintlgroup.com",
    "subject": "Sophie, missed calls are costing Fortune International Group listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.17918890884@smtp-relay.mailin.fr>",
    "email": "mbotello@fortuneintlgroup.com",
    "subject": "Melissa, missed calls are costing Fortune International Group listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.44922034732@smtp-relay.mailin.fr>",
    "email": "mgonzalez-ortiz@fortuneintlgroup.com",
    "subject": "Maritza, missed calls are costing Fortune International Group listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.16856874571@smtp-relay.mailin.fr>",
    "email": "roman@fpbinvestor.com",
    "subject": "Roman, missed calls are costing FPB Investment Properties listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.98309242290@smtp-relay.mailin.fr>",
    "email": "david.diestel@fsresidential.com",
    "subject": "David, missed calls are costing FirstService Corp listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.76653604916@smtp-relay.mailin.fr>",
    "email": "alexandra.jelley@fsresidential.com",
    "subject": "Alexandra, missed calls are costing FirstService Residential listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.53786456617@smtp-relay.mailin.fr>",
    "email": "sophie.philippe@fsresidential.com",
    "subject": "Sophie, missed calls are costing FirstService Residential Florida listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280905.84247124355@smtp-relay.mailin.fr>",
    "email": "galfonso@fvpre.com",
    "subject": "Gus, missed calls are costing Florida Value Partners listings",
    "sent_at": "2026-10-28T09:05:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.81750037379@smtp-relay.mailin.fr>",
    "email": "dfishman@gaiare.com",
    "subject": "Danny, missed calls are costing Gaia Real Estate listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.85503150675@smtp-relay.mailin.fr>",
    "email": "mshub@gdfproperties.com",
    "subject": "Mark, missed calls are costing GDF Properties LLC listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.11191484335@smtp-relay.mailin.fr>",
    "email": "shai@ghg-inv.com",
    "subject": "Shai, missed calls are costing Global Horizons Group LLLP listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.68312660980@smtp-relay.mailin.fr>",
    "email": "tpichet@globaltyinvestment.com",
    "subject": "Thomas, missed calls are costing Globalty Investment listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.25661433426@smtp-relay.mailin.fr>",
    "email": "hspooner@gocitywide.com",
    "subject": "Hub, missed calls are costing City Wide Facility Solutions listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.57752705044@smtp-relay.mailin.fr>",
    "email": "jcorbett@gotpi.org",
    "subject": "John, missed calls are costing TPI listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.94476644777@smtp-relay.mailin.fr>",
    "email": "dayanara.ortiz@gracebayresorts.com",
    "subject": "Dayanara, missed calls are costing Grace Bay Resorts, Turks & Caicos listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.98462675832@smtp-relay.mailin.fr>",
    "email": "erika@granathrealty.com",
    "subject": "Erika, missed calls are costing Granath Realty Group, Inc. listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.16925062727@smtp-relay.mailin.fr>",
    "email": "gdiaz@greenwaterinvestments.com",
    "subject": "Genaro, missed calls are costing Greenwater Investments | Greenwater Real Estate Management listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.71777038164@smtp-relay.mailin.fr>",
    "email": "marcelo@groveproperties.com",
    "subject": "Marcelo, missed calls are costing Grove Properties Florida listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.77284660308@smtp-relay.mailin.fr>",
    "email": "cchayet@gtispartners.com",
    "subject": "Casey, missed calls are costing Rhodes REI listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.21439742232@smtp-relay.mailin.fr>",
    "email": "salvador@harbourresidential.com",
    "subject": "Salvador, missed calls are costing Harbour Residential listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.90883107976@smtp-relay.mailin.fr>",
    "email": "stan@harvardmaint.com",
    "subject": "Stan, missed calls are costing Harvard Maintenance listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.35805949055@smtp-relay.mailin.fr>",
    "email": "hanan@hbparealty.com",
    "subject": "Hanan, missed calls are costing HBPA Realty listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.35677099895@smtp-relay.mailin.fr>",
    "email": "kerry@anniemacworx.com",
    "subject": "Kerry, missed calls are costing  listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.68684776857@smtp-relay.mailin.fr>",
    "email": "cole@hexclad.com",
    "subject": "Cole, missed calls are costing Hunt Developers listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.18281916719@smtp-relay.mailin.fr>",
    "email": "acabral@highgate.com",
    "subject": "Angie, missed calls are costing Highgate listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.57521912126@smtp-relay.mailin.fr>",
    "email": "mkuper@holladayproperties.com",
    "subject": "Michelle, missed calls are costing Lincoln Property Company listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.31182635376@smtp-relay.mailin.fr>",
    "email": "alexcarrasco@keyes.com",
    "subject": "Alex, missed calls are costing The Alex Carrasco Group listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.38820825290@smtp-relay.mailin.fr>",
    "email": "jodi@home-solutions.com",
    "subject": "Jodi, missed calls are costing Home Solutions Property Management, Inc. listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.28744847060@smtp-relay.mailin.fr>",
    "email": "sbisnoff@hostymosty.co",
    "subject": "Susan, missed calls are costing HostyMosty listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.20120076475@smtp-relay.mailin.fr>",
    "email": "michel.aguiar@housemaster.com",
    "subject": "Michel, missed calls are costing HouseMaster Serving Miami Dade listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.41593941091@smtp-relay.mailin.fr>",
    "email": "timothy@iconicequitiesgroup.com",
    "subject": "Tim, missed calls are costing Iconic Equities listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.89236285157@smtp-relay.mailin.fr>",
    "email": "ben@iconrealty.com",
    "subject": "Benjamin, missed calls are costing Icon Realty Management & Brokerage listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.65462346979@smtp-relay.mailin.fr>",
    "email": "haydee.leto@ihg.com",
    "subject": "Haydee, missed calls are costing Candlewood Suites® Hotels listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.36957488166@smtp-relay.mailin.fr>",
    "email": "okrzeminski@inspectionsflorida.com",
    "subject": "Odalis, missed calls are costing Allied Building Inspections Services listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.30528224875@smtp-relay.mailin.fr>",
    "email": "esteban@intuswindows.com",
    "subject": "Esteban, missed calls are costing Costa Rica Properties Co. listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.59765181183@smtp-relay.mailin.fr>",
    "email": "rodney.langer@investorscre.com",
    "subject": "Rodney, missed calls are costing Investors CRE listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.24429781457@smtp-relay.mailin.fr>",
    "email": "cathleen@chrislarenterprises.com",
    "subject": "CATHLEEN, missed calls are costing Chrislar Enterprises listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.71046071253@smtp-relay.mailin.fr>",
    "email": "jack@jackcodengroup.com",
    "subject": "Jack, missed calls are costing Coden Ferraro Group listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.88647492057@smtp-relay.mailin.fr>",
    "email": "spencer@jonisrealty.com",
    "subject": "Spencer, missed calls are costing Jonis Realty listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.85302959920@smtp-relay.mailin.fr>",
    "email": "julie@juliesrealty.net",
    "subject": "Yuliya, missed calls are costing Julie's Realty, LLC listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.52222226281@smtp-relay.mailin.fr>",
    "email": "daniela@kasagroupmiami.com",
    "subject": "Daniela, missed calls are costing Kasa Group Miami listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.37101320101@smtp-relay.mailin.fr>",
    "email": "acalleja@kasasrealty.com",
    "subject": "Angela, missed calls are costing Kasas Realty listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.45594009404@smtp-relay.mailin.fr>",
    "email": "michelledelvalle@keyes.com",
    "subject": "Michelle, missed calls are costing Gatsby Group Properties listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.37820489068@smtp-relay.mailin.fr>",
    "email": "tbartelmo@kislak.com",
    "subject": "Tom, missed calls are costing The Kislak Organization listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.48454073447@smtp-relay.mailin.fr>",
    "email": "don.dewoody@landmarkcra.com",
    "subject": "Don, missed calls are costing Landmark Commercial Realty Advisors listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.22434359612@smtp-relay.mailin.fr>",
    "email": "tbrazy@landmarkdividend.com",
    "subject": "Tim, missed calls are costing Landmark Dividend LLC listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.50277517887@smtp-relay.mailin.fr>",
    "email": "lisa@laserfacility.com",
    "subject": "Lisa, missed calls are costing Laser Facility Management listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.80107941968@smtp-relay.mailin.fr>",
    "email": "cameron@laspalmascapital.us",
    "subject": "Cameron, missed calls are costing Las Palmas Capital LLC listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.22527804015@smtp-relay.mailin.fr>",
    "email": "jzawid@lcrcapital.com",
    "subject": "Jennifer, missed calls are costing Condado Consulting Group listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.92671874944@smtp-relay.mailin.fr>",
    "email": "elvis@gpestates.com",
    "subject": "Elvis, missed calls are costing GLOBAL PRESTIGE ESTATES listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.79129417654@smtp-relay.mailin.fr>",
    "email": "jcarrion@lloydjonesllc.com",
    "subject": "Jimmy, missed calls are costing Lloyd Jones listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280906.81259819382@smtp-relay.mailin.fr>",
    "email": "steve@localreco.com",
    "subject": "Stephen, missed calls are costing LOCAL Real Estate Co listings",
    "sent_at": "2026-10-28T09:06:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.93212120322@smtp-relay.mailin.fr>",
    "email": "atilla@loftonconsulting.com",
    "subject": "Atilla, missed calls are costing Lofton Consulting listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.23645597245@smtp-relay.mailin.fr>",
    "email": "ldrody@lowellinternationalrealty.com",
    "subject": "Lani, missed calls are costing Lowell International Realty listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.99189143515@smtp-relay.mailin.fr>",
    "email": "karla@luxurylivingrealty.com",
    "subject": "Karla, missed calls are costing Luxury Living Realty listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.19952265056@smtp-relay.mailin.fr>",
    "email": "jennie@marinatitle.com",
    "subject": "Jennie, missed calls are costing Marina Title, Florida's Premier Title Company listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.17996068858@smtp-relay.mailin.fr>",
    "email": "bryan.devlin@marriott.com",
    "subject": "Bryan, missed calls are costing Marriott International listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.95297348862@smtp-relay.mailin.fr>",
    "email": "rochelle.tingling@marriott.com",
    "subject": "Rochelle, missed calls are costing Marriott International listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.12157777221@smtp-relay.mailin.fr>",
    "email": "chris@mayfairre.com",
    "subject": "Chris, missed calls are costing Mayfair Real Estate Investments & Management listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.12838640428@smtp-relay.mailin.fr>",
    "email": "spatel@mhghotelsllc.com",
    "subject": "Sanjay, missed calls are costing MHG Hotels listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.89179711954@smtp-relay.mailin.fr>",
    "email": "john@miamicasabuyers.com",
    "subject": "John, missed calls are costing Miami Casa Buyers, LLC listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.66346908102@smtp-relay.mailin.fr>",
    "email": "francesco@miamidreamsrealty.com",
    "subject": "Francesco, missed calls are costing Miami Dreams Realty, Inc. listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.36096678089@smtp-relay.mailin.fr>",
    "email": "dcoy@milbermakris.com",
    "subject": "Daniela, missed calls are costing Title X & Escrow, LLC listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.28933161529@smtp-relay.mailin.fr>",
    "email": "vm@morabitoproperties.com",
    "subject": "Valerio, missed calls are costing Morabito Properties LLC listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.57406666718@smtp-relay.mailin.fr>",
    "email": "ray@myvillakey.com",
    "subject": "Ray, missed calls are costing VillaKey listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.61923554236@smtp-relay.mailin.fr>",
    "email": "claudioprattico@neptunepartners.eu",
    "subject": "Claudio, missed calls are costing Neptune Partners listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.34100251401@smtp-relay.mailin.fr>",
    "email": "mfuentes@newgardgroup.com",
    "subject": "Maria, missed calls are costing Newgard Group listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.69527812574@smtp-relay.mailin.fr>",
    "email": "jim@newpathtitle.com",
    "subject": "Jim, missed calls are costing New Path Title listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.22277686817@smtp-relay.mailin.fr>",
    "email": "tamir.ness@npmginc.com",
    "subject": "Tamir, missed calls are costing Ness Property Management Group, Inc. listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.11771460231@smtp-relay.mailin.fr>",
    "email": "breynolds@nrinternational.com",
    "subject": "Brent, missed calls are costing Nolan Reynolds International listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.36100394047@smtp-relay.mailin.fr>",
    "email": "george@oneblinc.com",
    "subject": "George, missed calls are costing Crestline Capital listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.66992878804@smtp-relay.mailin.fr>",
    "email": "perci@ownrealty.com",
    "subject": "Perci, missed calls are costing OWN listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.23936457678@smtp-relay.mailin.fr>",
    "email": "vanessa.darocha@colliers.com",
    "subject": "Vanessa, missed calls are costing Colliers listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.19711386975@smtp-relay.mailin.fr>",
    "email": "dora@palazzodellaluna.com",
    "subject": "Dora, missed calls are costing Palazzo Della Luna - Fisher Island listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.95061280385@smtp-relay.mailin.fr>",
    "email": "adrian@palladiuminvestments.com",
    "subject": "Adrian, missed calls are costing Palladium Investments listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.48105615458@smtp-relay.mailin.fr>",
    "email": "jwyss@parakeetcommunities.com",
    "subject": "Jonathan, missed calls are costing Parakeet Communities listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.53107076768@smtp-relay.mailin.fr>",
    "email": "david@parkavecap.com",
    "subject": "David, missed calls are costing Parkave listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.59122998111@smtp-relay.mailin.fr>",
    "email": "eavila@peeblescorp.com",
    "subject": "Erika, missed calls are costing The Peebles Corporation® listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.51308694516@smtp-relay.mailin.fr>",
    "email": "ralph@penaappraisal.com",
    "subject": "Ralph, missed calls are costing Pena Appraisal Services Inc. listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.73679288301@smtp-relay.mailin.fr>",
    "email": "gbeekman@pensamcapital.com",
    "subject": "gavin, missed calls are costing Pensam listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.11894708575@smtp-relay.mailin.fr>",
    "email": "jason@perezdubois.com",
    "subject": "Jason, missed calls are costing Perez & DuBois Real Estate listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.45543515037@smtp-relay.mailin.fr>",
    "email": "max@pinnaclehousing.com",
    "subject": "Max, missed calls are costing Pinnacle listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.54550866132@smtp-relay.mailin.fr>",
    "email": "phoudard@pipelineworkspaces.com",
    "subject": "Philippe, missed calls are costing Pipeline Workspaces listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.43079788500@smtp-relay.mailin.fr>",
    "email": "tom@prakascompany.com",
    "subject": "Tom, missed calls are costing Prakas & Company listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.19687214505@smtp-relay.mailin.fr>",
    "email": "jay@prospergroup.com",
    "subject": "Jay, missed calls are costing Prosper Group listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.13986456907@smtp-relay.mailin.fr>",
    "email": "seth@quakertitle.com",
    "subject": "Seth, missed calls are costing Quaker Title & Escrow listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.83593977976@smtp-relay.mailin.fr>",
    "email": "joanna@quartzproperties.com",
    "subject": "Joanna, missed calls are costing Quartz Properties listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.37102158590@smtp-relay.mailin.fr>",
    "email": "laura@questworkspaces.com",
    "subject": "Laura, missed calls are costing Quest Workspaces listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.72911432226@smtp-relay.mailin.fr>",
    "email": "arakover@qum-realestate.com",
    "subject": "Alex, missed calls are costing QUM Real Estate Advisors listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.80744058633@smtp-relay.mailin.fr>",
    "email": "leandro@reallrealty.com",
    "subject": "Leandro, missed calls are costing REall Realty listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.77855287671@smtp-relay.mailin.fr>",
    "email": "remy@realt.co",
    "subject": "Rémy, missed calls are costing RealT listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.37953577312@smtp-relay.mailin.fr>",
    "email": "rbeckett@bitrealty.com",
    "subject": "Ryan, missed calls are costing BitRealty ® listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.28844126959@smtp-relay.mailin.fr>",
    "email": "rich@realtyhomeadvisors.com",
    "subject": "Rich, missed calls are costing Realty Home Advisors, Inc. listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.22931882445@smtp-relay.mailin.fr>",
    "email": "eileen@realtyhomeadvisors.com",
    "subject": "Eileen, missed calls are costing Realty Home Advisors, Inc. listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.42871741221@smtp-relay.mailin.fr>",
    "email": "wmarks@relatedgroup.com",
    "subject": "Wendy, missed calls are costing Related Group listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280907.46074834443@smtp-relay.mailin.fr>",
    "email": "vladimir.bugera@rialtocapital.com",
    "subject": "Vladimir, missed calls are costing BIG DATA REALTY listings",
    "sent_at": "2026-10-28T09:07:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.92632089735@smtp-relay.mailin.fr>",
    "email": "frobinette@robinettehomes.com",
    "subject": "Ford, missed calls are costing Robinette Homes Inc listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.26187625228@smtp-relay.mailin.fr>",
    "email": "bross@ross-realty.com",
    "subject": "Barry, missed calls are costing Ross Realty Investments, Inc. listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.28003533598@smtp-relay.mailin.fr>",
    "email": "sam@realidinc.com",
    "subject": "Sam, missed calls are costing rPay Rent Payment listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.73614404765@smtp-relay.mailin.fr>",
    "email": "hue@saglo.com",
    "subject": "Hue, missed calls are costing Saglo Companies listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.85946031892@smtp-relay.mailin.fr>",
    "email": "peter@salonsbyjc.com",
    "subject": "Peter, missed calls are costing Salons by JC listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.30868959755@smtp-relay.mailin.fr>",
    "email": "scaster@samosetre.com",
    "subject": "Steven, missed calls are costing SAMOSET REAL ESTATE CORPORATION listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.97352456575@smtp-relay.mailin.fr>",
    "email": "jalexander@shanercorp.com",
    "subject": "Jason, missed calls are costing Shaner Hotels listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.77247250474@smtp-relay.mailin.fr>",
    "email": "flavio@sherlockfinder.com",
    "subject": "Flavio, missed calls are costing SherlockFinder listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.31776118069@smtp-relay.mailin.fr>",
    "email": "rsieber@sieberinternational.com",
    "subject": "Ruedi, missed calls are costing Sieber International listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.54819698423@smtp-relay.mailin.fr>",
    "email": "rgrabill@simon.com",
    "subject": "Ron, missed calls are costing Simon Property Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.16506396315@smtp-relay.mailin.fr>",
    "email": "sean@skilledrealestate.com",
    "subject": "Sean, missed calls are costing Skilled Real Estate listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.53333749575@smtp-relay.mailin.fr>",
    "email": "jgranados@sol-depot.com",
    "subject": "Jorge, missed calls are costing MANA Apartments listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.76314544247@smtp-relay.mailin.fr>",
    "email": "es@solomonhomes.info",
    "subject": "Eric, missed calls are costing Solomon Homes listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.16857228258@smtp-relay.mailin.fr>",
    "email": "devin@spauldinghomeinspections.com",
    "subject": "Devin, missed calls are costing Spaulding Home Inspections listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.91411214854@smtp-relay.mailin.fr>",
    "email": "lori@sterlingteetor.com",
    "subject": "Lori, missed calls are costing Sterling Teetor Realty Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.10068058201@smtp-relay.mailin.fr>",
    "email": "kenneth.stiles@stiles.com",
    "subject": "Kenneth, missed calls are costing Stiles listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.36869790382@smtp-relay.mailin.fr>",
    "email": "giancarlo.goeta@hilton.com",
    "subject": "Giancarlo, missed calls are costing Hilton listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.55882226940@smtp-relay.mailin.fr>",
    "email": "jsantana@sunlandgp.com",
    "subject": "Javier, missed calls are costing Sunland Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.81126099377@smtp-relay.mailin.fr>",
    "email": "nballadares@sydellgroup.com",
    "subject": "Norma, missed calls are costing Sydell Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.29715156347@smtp-relay.mailin.fr>",
    "email": "jackson@syndigatecapital.com",
    "subject": "Jackson, missed calls are costing SyndiGate Capital LLC listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.99071359879@smtp-relay.mailin.fr>",
    "email": "asarduy@synergyrealtymiami.com",
    "subject": "Andros, missed calls are costing Synergy Realty Advisors LLC listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.92690412487@smtp-relay.mailin.fr>",
    "email": "jason@tciicapital.com",
    "subject": "Jason, missed calls are costing TCII listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.71843740551@smtp-relay.mailin.fr>",
    "email": "marc@tciicapital.com",
    "subject": "Marc, missed calls are costing TCII listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.22038863500@smtp-relay.mailin.fr>",
    "email": "simon@condostorecanada.com",
    "subject": "Simon, missed calls are costing TCS Miami listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.55749322143@smtp-relay.mailin.fr>",
    "email": "david@tekvisual.com",
    "subject": "David, missed calls are costing TekVisual, LLC. listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.45146473780@smtp-relay.mailin.fr>",
    "email": "luis@tenantevaluation.com",
    "subject": "Luis, missed calls are costing Tenant Evaluation LLC listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.13684416323@smtp-relay.mailin.fr>",
    "email": "sbittel@terranovacorp.com",
    "subject": "Stephen, missed calls are costing Terranova Corporation listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.26218785510@smtp-relay.mailin.fr>",
    "email": "nicole@the5starhost.com",
    "subject": "Nicole, missed calls are costing The 5 Star Host listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.59662416967@smtp-relay.mailin.fr>",
    "email": "melina@theclosingsigningservice.com",
    "subject": "Melina, missed calls are costing The Closing Signing Service listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.18725579018@smtp-relay.mailin.fr>",
    "email": "rgood@thegoodgroup.com",
    "subject": "Robert, missed calls are costing The Good Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.22811074537@smtp-relay.mailin.fr>",
    "email": "pablo@thehypegroup.com",
    "subject": "Pablo, missed calls are costing The Hype Real Estate Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.50278775402@smtp-relay.mailin.fr>",
    "email": "will@thepearlrealtygroup.com",
    "subject": "William, missed calls are costing The Pearl Realty Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.72454969801@smtp-relay.mailin.fr>",
    "email": "behzad@thesouferiangroup.com",
    "subject": "Behzad, missed calls are costing The Souferian Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.75724911499@smtp-relay.mailin.fr>",
    "email": "leswaites@keyes.com",
    "subject": "Les, missed calls are costing The Waites Group listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.26327248201@smtp-relay.mailin.fr>",
    "email": "mark@titleguarantyflorida.com",
    "subject": "MARK, missed calls are costing Title Guaranty of South Florida listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.90724680100@smtp-relay.mailin.fr>",
    "email": "kelly@titleguarantyflorida.com",
    "subject": "Kelly, missed calls are costing Title Guaranty of South Florida listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.95251726538@smtp-relay.mailin.fr>",
    "email": "mpellar@tmregllc.com",
    "subject": "Matthew, missed calls are costing TM Real Estate Group, LLC listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.91433721599@smtp-relay.mailin.fr>",
    "email": "hucasro@treevita.com",
    "subject": "Hugo, missed calls are costing Treevita listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.42371062205@smtp-relay.mailin.fr>",
    "email": "drittenhouse@trinitas.ventures",
    "subject": "David, missed calls are costing Trinitas Ventures listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.54975749330@smtp-relay.mailin.fr>",
    "email": "rmillard@trusthospitality.com",
    "subject": "Richard, missed calls are costing Trust Hospitality LLC listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.80733785389@smtp-relay.mailin.fr>",
    "email": "sabozina@turnberry.com",
    "subject": "Suzanne, missed calls are costing Turnberry listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.88138712764@smtp-relay.mailin.fr>",
    "email": "cabramson@turnberry.com",
    "subject": "Carol, missed calls are costing Turnberry listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280908.78924937501@smtp-relay.mailin.fr>",
    "email": "dwilliams@turnberry.com",
    "subject": "Jackie, missed calls are costing Turnberry listings",
    "sent_at": "2026-10-28T09:08:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.83447410799@smtp-relay.mailin.fr>",
    "email": "jsoffer@turnberry.com",
    "subject": "Jeffrey, missed calls are costing Turnberry listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.23430326960@smtp-relay.mailin.fr>",
    "email": "shenney@turnberry.com",
    "subject": "Sheril, missed calls are costing Turnberry listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.92915786832@smtp-relay.mailin.fr>",
    "email": "sergioelbaum@urbanchoices.com",
    "subject": "Sergio, missed calls are costing Urban Choices Group listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.42890984722@smtp-relay.mailin.fr>",
    "email": "kristine@urbanizeproperties.com",
    "subject": "🌴Kristine, missed calls are costing Urbanize Properties listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.35939803543@smtp-relay.mailin.fr>",
    "email": "andrea@vellamiami.com",
    "subject": "Andrea, missed calls are costing Vella Real Estate listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.52004106049@smtp-relay.mailin.fr>",
    "email": "dmilam@viemgmt.com",
    "subject": "Derrick, missed calls are costing Vie Management listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.96051516710@smtp-relay.mailin.fr>",
    "email": "evivo@vivogroup.net",
    "subject": "Evelyn, missed calls are costing Vivo Real Estate Group, Inc. listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.87018323985@smtp-relay.mailin.fr>",
    "email": "sgordon@wexforddevelopments.com",
    "subject": "Sam, missed calls are costing Wexford Developments listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.17810642333@smtp-relay.mailin.fr>",
    "email": "deisenberg@whartonequity.com",
    "subject": "David, missed calls are costing Wharton Equity Partners listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.15305818299@smtp-relay.mailin.fr>",
    "email": "mark@whi-fl.com",
    "subject": "Mark, missed calls are costing WHI Home Inspection Services listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.97029309480@smtp-relay.mailin.fr>",
    "email": "jjacobs@wickersmith.com",
    "subject": "Jean, missed calls are costing Shield Title & Escrow listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.39461419859@smtp-relay.mailin.fr>",
    "email": "erodrigues@williamsislandclub.com",
    "subject": "Edward, missed calls are costing Williams Island POA listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.20792666686@smtp-relay.mailin.fr>",
    "email": "adrian@wiremiami.com",
    "subject": "Adrian, missed calls are costing WIRE Real Estate - Miami/NY listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.12033891523@smtp-relay.mailin.fr>",
    "email": "sofia@wiseowlcompany.com",
    "subject": "Sofia, missed calls are costing Wise Owl Realty listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.15017441811@smtp-relay.mailin.fr>",
    "email": "smykalov@wolsenrealestate.com",
    "subject": "Denis, missed calls are costing Wolsen Real Estate listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.51995657050@smtp-relay.mailin.fr>",
    "email": "info@emprofessionalservices.net",
    "subject": "Efrain, missed calls are costing EM Inspections listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.81301880197@smtp-relay.mailin.fr>",
    "email": "miguel_hernandez@hilton.com",
    "subject": "Miguel, missed calls are costing Hilton listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.47562448679@smtp-relay.mailin.fr>",
    "email": "lisette.beraja@magasi.co",
    "subject": "Lisette, missed calls are costing MAGASI Management listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.40392725051@smtp-relay.mailin.fr>",
    "email": "mary@personalhomemanagement.net",
    "subject": "Mary, missed calls are costing Personal Home Management listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.19848068934@smtp-relay.mailin.fr>",
    "email": "lcalderon@neologylife.com",
    "subject": "Lissette, missed calls are costing Neology Group listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.61541943507@smtp-relay.mailin.fr>",
    "email": "zoe.parker@hilton.com",
    "subject": "Zoe, missed calls are costing Hilton listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.27388749062@smtp-relay.mailin.fr>",
    "email": "gideon@floridastatetrust.com",
    "subject": "Gideon, missed calls are costing Florida State Trust listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.19302934475@smtp-relay.mailin.fr>",
    "email": "cklepper@compson.com",
    "subject": "Carl, missed calls are costing Compson Associates listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.24862066111@smtp-relay.mailin.fr>",
    "email": "john@tothrealty.net",
    "subject": "John, missed calls are costing Toth Realty Inc listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.16809217385@smtp-relay.mailin.fr>",
    "email": "dmiska@gatorinvestments.com",
    "subject": "Doug, missed calls are costing Gator Investments listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.82538486320@smtp-relay.mailin.fr>",
    "email": "mcohen@amgfamilyrealty.com",
    "subject": "Marty, missed calls are costing Amg Family Realty listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.12088903772@smtp-relay.mailin.fr>",
    "email": "evelyn@arialuxerealty.com",
    "subject": "Evelyn, missed calls are costing Aria Luxe Realty listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610280909.45360794039@smtp-relay.mailin.fr>",
    "email": "ecababie@gicsa.com.mx",
    "subject": "Elias, missed calls are costing GICSA listings",
    "sent_at": "2026-10-28T09:09:00+00:00",
    "source": "wave1-2026-10-28"
  },
  {
    "messageId": "<202610291212.50145073344@smtp-relay.mailin.fr>",
    "email": "bill.hernandez@elliman.com",
    "subject": "Collab opportunity — Bill & Bryan Team",
    "sent_at": "2026-10-29T12:12:05Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.52798237681@smtp-relay.mailin.fr>",
    "email": "website@jillszeder.com",
    "subject": "Collab opportunity — Jills Zeder Group",
    "sent_at": "2026-10-29T12:12:08Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.50981174633@smtp-relay.mailin.fr>",
    "email": "ben@benmossgroup.com",
    "subject": "Collab opportunity — Ben Moss Group",
    "sent_at": "2026-10-29T12:12:08Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.31608830572@smtp-relay.mailin.fr>",
    "email": "website@elmirgroup.com",
    "subject": "Collab opportunity — The Elmir Group",
    "sent_at": "2026-10-29T12:12:09Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.12323957508@smtp-relay.mailin.fr>",
    "email": "info@destinymedspa.com",
    "subject": "Collab opportunity — Destiny Med Spa",
    "sent_at": "2026-10-29T12:12:10Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.62211509289@smtp-relay.mailin.fr>",
    "email": "hello_nm@realsmiledentistry.com",
    "subject": "Collab opportunity — Real Smile Dentistry",
    "sent_at": "2026-10-29T12:12:11Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.55565794176@smtp-relay.mailin.fr>",
    "email": "contact@dentaldesignsmile.com",
    "subject": "Collab opportunity — Dental Design Smile",
    "sent_at": "2026-10-29T12:12:12Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.86779509322@smtp-relay.mailin.fr>",
    "email": "info@rightcaredental.com",
    "subject": "Collab opportunity — Right Care Dental",
    "sent_at": "2026-10-29T12:12:13Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.69783340529@smtp-relay.mailin.fr>",
    "email": "hello@generate.ae",
    "subject": "Collab opportunity — Bardia Namin",
    "sent_at": "2026-10-29T12:12:13Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.36083380023@smtp-relay.mailin.fr>",
    "email": "rawan@mohanadalwadiya.com",
    "subject": "Collab opportunity — Mohanad Alwadiya",
    "sent_at": "2026-10-29T12:12:14Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.67949251116@smtp-relay.mailin.fr>",
    "email": "Sirajmalikuae@gmail.com",
    "subject": "Collab opportunity — Siraj Izhar",
    "sent_at": "2026-10-29T12:12:15Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.53693138125@smtp-relay.mailin.fr>",
    "email": "medyumedbluewaters@gmail.com",
    "subject": "Collab opportunity — MED YU MED",
    "sent_at": "2026-10-29T12:12:16Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.68541048095@smtp-relay.mailin.fr>",
    "email": "info@rosmetic.com",
    "subject": "Collab opportunity — Rosmetic",
    "sent_at": "2026-10-29T12:12:17Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.97752470085@smtp-relay.mailin.fr>",
    "email": "ansab@wallrealestate.ae",
    "subject": "Collab opportunity — Mohammed Ansab",
    "sent_at": "2026-10-29T12:12:18Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.53604019136@smtp-relay.mailin.fr>",
    "email": "info@springfieldre.com",
    "subject": "Collab opportunity — Daniela Pires",
    "sent_at": "2026-10-29T12:12:18Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.15121728848@smtp-relay.mailin.fr>",
    "email": "info@sobharealty.com",
    "subject": "Collab opportunity — Arwa Nahhas",
    "sent_at": "2026-10-29T12:12:19Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.28819287231@smtp-relay.mailin.fr>",
    "email": "dubai@engelvoelkers.com",
    "subject": "Collab opportunity — Fadi Alsalem",
    "sent_at": "2026-10-29T12:12:20Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.22304345785@smtp-relay.mailin.fr>",
    "email": "katyasid00@icloud.com",
    "subject": "Collab opportunity — Katrin Sydorenko",
    "sent_at": "2026-10-29T12:12:21Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.92522205003@smtp-relay.mailin.fr>",
    "email": "marija@oneinvestments.com",
    "subject": "Collab opportunity — Marija, One Investments",
    "sent_at": "2026-10-29T12:12:22Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.22897381736@smtp-relay.mailin.fr>",
    "email": "info@aquaproperties.com",
    "subject": "Collab opportunity — Kritika Sharma",
    "sent_at": "2026-10-29T12:12:23Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.11735185447@smtp-relay.mailin.fr>",
    "email": "reception@staraestheticsuk.com",
    "subject": "Collab opportunity — Star Aesthetics",
    "sent_at": "2026-10-29T12:12:23Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.61413284401@smtp-relay.mailin.fr>",
    "email": "clinic.info@dredrobinson.co.uk",
    "subject": "Collab opportunity — Dr Ed Robinson",
    "sent_at": "2026-10-29T12:12:24Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.81377085207@smtp-relay.mailin.fr>",
    "email": "info@drtatiana.co.uk",
    "subject": "Collab opportunity — Dr Tatiana Clinic",
    "sent_at": "2026-10-29T12:12:25Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.31051212839@smtp-relay.mailin.fr>",
    "email": "info@beyouthful.com",
    "subject": "Collab opportunity — Dr Selene, Be You Medical",
    "sent_at": "2026-10-29T12:12:26Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.76776672298@smtp-relay.mailin.fr>",
    "email": "villas@villazzo.com",
    "subject": "Collab opportunity — Lisa Blake",
    "sent_at": "2026-10-29T12:12:27Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.83675971434@smtp-relay.mailin.fr>",
    "email": "Alyssa@insidenetworkco.com",
    "subject": "Collab opportunity — Alyssa Morgan",
    "sent_at": "2026-10-29T12:12:28Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.17423369777@smtp-relay.mailin.fr>",
    "email": "whitney@whitneymhomes.com",
    "subject": "Collab opportunity — Whitney Parsons",
    "sent_at": "2026-10-29T12:12:28Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610291212.12226267594@smtp-relay.mailin.fr>",
    "email": "Emily@acmexserhant.com",
    "subject": "Collab opportunity — Emily Sinclair",
    "sent_at": "2026-10-29T12:12:29Z",
    "source": "instagram-contacts-2026-10-29"
  },
  {
    "messageId": "<202610301016.93284534142@smtp-relay.mailin.fr>",
    "email": "rick@zuhne.com",
    "subject": "Rick, the lead you already paid for",
    "sent_at": "2026-10-30T10:16:54.922960+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301016.40570222022@smtp-relay.mailin.fr>",
    "email": "seth.borland@barvin.com",
    "subject": "Seth, the lead you already paid for",
    "sent_at": "2026-10-30T10:16:58.350679+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.39410402164@smtp-relay.mailin.fr>",
    "email": "bill.bexley@bexleyrealtygroup.com",
    "subject": "Bill, the lead you already paid for",
    "sent_at": "2026-10-30T10:16:59.210169+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.56669706725@smtp-relay.mailin.fr>",
    "email": "kelly@bridgegrouptx.com",
    "subject": "Kelly, the lead you already paid for",
    "sent_at": "2026-10-30T10:16:59.967842+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.40669602832@smtp-relay.mailin.fr>",
    "email": "melanie@camelothouston.com",
    "subject": "Melanie, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:00.877814+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.70072568613@smtp-relay.mailin.fr>",
    "email": "amy@cityscapebrokers.com",
    "subject": "Amy, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:01.641178+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.31449459901@smtp-relay.mailin.fr>",
    "email": "mark@bayoucitysteam.com",
    "subject": "Mark, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:02.420417+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.33128704278@smtp-relay.mailin.fr>",
    "email": "mark@davis-commercial.com",
    "subject": "Mark, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:03.307582+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.10461706062@smtp-relay.mailin.fr>",
    "email": "adeiso@deisomoss.com",
    "subject": "Andrew, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:04.679954+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.29017176380@smtp-relay.mailin.fr>",
    "email": "brandi@diversecity.us",
    "subject": "Brandi, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:05.469549+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.33654823795@smtp-relay.mailin.fr>",
    "email": "raymond@drcashhomebuyers.com",
    "subject": "Raymond, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:06.370065+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.96213936292@smtp-relay.mailin.fr>",
    "email": "anan@dunyha.com",
    "subject": "Anan, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:07.188510+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.97955013707@smtp-relay.mailin.fr>",
    "email": "manuel@whitepicketrealty.com",
    "subject": "Manuel, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:07.981671+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.25922848003@smtp-relay.mailin.fr>",
    "email": "carlb@eaglere.com",
    "subject": "Carl, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:09.011662+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.15473480920@smtp-relay.mailin.fr>",
    "email": "jennifer@erwingrealty.com",
    "subject": "Jennifer, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:09.847583+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.93241922621@smtp-relay.mailin.fr>",
    "email": "ruthgracey@greathoustonproperties.com",
    "subject": "Ruth, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:10.720781+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.56804903548@smtp-relay.mailin.fr>",
    "email": "leon@greenresidential.com",
    "subject": "Leon, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:12.068325+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.29900944005@smtp-relay.mailin.fr>",
    "email": "timothy@hampsonproperties.com",
    "subject": "Timothy, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:12.963853+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.80355375354@smtp-relay.mailin.fr>",
    "email": "mahir@happenhouston.com",
    "subject": "Mahir, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:13.925368+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.18787686444@smtp-relay.mailin.fr>",
    "email": "david@herzoghomes.com",
    "subject": "David, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:14.779831+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.42719899470@smtp-relay.mailin.fr>",
    "email": "jake@homevelopers.com",
    "subject": "Jake, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:15.582271+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.71202819431@smtp-relay.mailin.fr>",
    "email": "therese@houstonianproperties.com",
    "subject": "Therese, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:16.355573+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.17494519233@smtp-relay.mailin.fr>",
    "email": "jessie@jsinghhomes.com",
    "subject": "Jessie, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:17.292754+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.96394386610@smtp-relay.mailin.fr>",
    "email": "lisas@kengroup.com",
    "subject": "Lisa, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:18.197093+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.33888649120@smtp-relay.mailin.fr>",
    "email": "bbalderas@lionsgaterealty.com",
    "subject": "Brizeida, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:18.985733+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.75587745884@smtp-relay.mailin.fr>",
    "email": "mark.lappin@listingdoor.com",
    "subject": "Mark, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:19.758817+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.79864561212@smtp-relay.mailin.fr>",
    "email": "cmills@llanorealty.com",
    "subject": "Cullen, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:20.584863+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.71610215535@smtp-relay.mailin.fr>",
    "email": "scottr@pipelinerealty.com",
    "subject": "Scott, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:21.441984+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.81299624992@smtp-relay.mailin.fr>",
    "email": "julie@lynrealtytexas.com",
    "subject": "Julie, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:22.267451+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.63735947319@smtp-relay.mailin.fr>",
    "email": "hydie@mcalisterassets.com",
    "subject": "Hydie, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:23.087667+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.30954913132@smtp-relay.mailin.fr>",
    "email": "michael@mccartybmx.com",
    "subject": "Michael, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:23.865930+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.73909234334@smtp-relay.mailin.fr>",
    "email": "sarah.montgomery@pnc.com",
    "subject": "Sarah, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:24.556036+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.72265557270@smtp-relay.mailin.fr>",
    "email": "nmagon@ninamagon.com",
    "subject": "Nina, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:25.378517+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.60159907874@smtp-relay.mailin.fr>",
    "email": "tara.oliver@oliver-cre.com",
    "subject": "Tara, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:26.090248+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.25241094716@smtp-relay.mailin.fr>",
    "email": "joel@ppshousebuyers.com",
    "subject": "Joel, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:26.917825+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.87988081639@smtp-relay.mailin.fr>",
    "email": "zameer@premierglobalequity.com",
    "subject": "Zameer, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:27.848663+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.76112224101@smtp-relay.mailin.fr>",
    "email": "adam.raffle@raffleparking.com",
    "subject": "Adam, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:28.519626+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.18583208105@smtp-relay.mailin.fr>",
    "email": "shawn@realestatehouston.com",
    "subject": "Shawn, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:29.245862+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.31140102312@smtp-relay.mailin.fr>",
    "email": "walker@realtywalk.com",
    "subject": "Ray, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:30.011675+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.47752478031@smtp-relay.mailin.fr>",
    "email": "jw@reootx.com",
    "subject": "John, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:30.705709+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.67041356993@smtp-relay.mailin.fr>",
    "email": "jlowe@rgvsp.com",
    "subject": "J, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:31.805606+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.43292835043@smtp-relay.mailin.fr>",
    "email": "femirogers@rostoninvestment.com",
    "subject": "Femi, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:32.638111+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.63483123758@smtp-relay.mailin.fr>",
    "email": "rurech@rycorecapital.com",
    "subject": "Ryan, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:33.477110+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.15936222167@smtp-relay.mailin.fr>",
    "email": "landon@sellerfinanceme.com",
    "subject": "Landon, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:34.156178+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.90061291054@smtp-relay.mailin.fr>",
    "email": "juliana@southhausliving.com",
    "subject": "Juliana, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:34.918410+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.59690151912@smtp-relay.mailin.fr>",
    "email": "slerner@trccapitalpartners.com",
    "subject": "Steven, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:35.711241+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.87187838391@smtp-relay.mailin.fr>",
    "email": "jessica@triohoa.com",
    "subject": "Jessica, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:36.545308+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.91872561261@smtp-relay.mailin.fr>",
    "email": "l.williams@hp.com",
    "subject": "LaKienya, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:37.354399+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.28742997660@smtp-relay.mailin.fr>",
    "email": "nicole@wicked-holdings.com",
    "subject": "Nicole, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:38.089324+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.20192175130@smtp-relay.mailin.fr>",
    "email": "ks@williamsburgent.com",
    "subject": "Khaled, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:38.867452+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.24613166965@smtp-relay.mailin.fr>",
    "email": "gwomack@womackdevelopment.com",
    "subject": "Gerald, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:39.610674+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.51146174447@smtp-relay.mailin.fr>",
    "email": "stuart.meyers@meyersgroup.net",
    "subject": "Stuart, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:40.435168+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.53491216057@smtp-relay.mailin.fr>",
    "email": "tom@swift-pix.com",
    "subject": "Tom, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:41.237928+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.78338575069@smtp-relay.mailin.fr>",
    "email": "emily@zqrealty.com",
    "subject": "Emily, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:42.584825+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.80254945575@smtp-relay.mailin.fr>",
    "email": "liana@klerigirealty.com",
    "subject": "Liana, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:43.507289+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.99331448152@smtp-relay.mailin.fr>",
    "email": "j_cox@federatedcompanies.com",
    "subject": "Jonathan, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:44.351795+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.93395769931@smtp-relay.mailin.fr>",
    "email": "nick@valenciahome.com",
    "subject": "Nick, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:45.038181+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.54364634167@smtp-relay.mailin.fr>",
    "email": "jaime@1on1realestate.com",
    "subject": "Jaime, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:45.892172+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.63114953161@smtp-relay.mailin.fr>",
    "email": "evelynavila@21cig.com",
    "subject": "Evelyn, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:47.251427+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.63900886301@smtp-relay.mailin.fr>",
    "email": "jbailey@49units.com",
    "subject": "Jesse, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:48.179721+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.29436172463@smtp-relay.mailin.fr>",
    "email": "albertov@aldirealestate.com",
    "subject": "Alberto, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:49.032167+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.76354745553@smtp-relay.mailin.fr>",
    "email": "ronetto@altadevelopers.com",
    "subject": "Raimundo, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:49.850801+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.42183983083@smtp-relay.mailin.fr>",
    "email": "daniel@miamirealtynetwork.com",
    "subject": "Daniel, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:50.583801+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.14393508803@smtp-relay.mailin.fr>",
    "email": "danit@barkbuildings.com",
    "subject": "Danit, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:51.317357+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.40082406792@smtp-relay.mailin.fr>",
    "email": "ale@belonghome.com",
    "subject": "Ale, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:52.313067+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.13716004773@smtp-relay.mailin.fr>",
    "email": "tyler@belonghome.com",
    "subject": "Tyler, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:53.314067+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.37305342967@smtp-relay.mailin.fr>",
    "email": "owen@belonghome.com",
    "subject": "Owen, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:53.999402+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.82668701977@smtp-relay.mailin.fr>",
    "email": "brandon@bgluxeproperties.com",
    "subject": "Brandon, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:54.682036+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.98415985234@smtp-relay.mailin.fr>",
    "email": "mbibr@biscaynere.com",
    "subject": "Michal, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:55.463188+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.41845739648@smtp-relay.mailin.fr>",
    "email": "jescobar@blacksalmon.com",
    "subject": "Jorge, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:56.249045+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.82886554752@smtp-relay.mailin.fr>",
    "email": "chris@justhinkit.com",
    "subject": "Chris, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:57.140491+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.31722608648@smtp-relay.mailin.fr>",
    "email": "contact@blueonerealty.com",
    "subject": "Natalia, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:57.945035+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301017.19318242775@smtp-relay.mailin.fr>",
    "email": "gloria@bocaexpert.com",
    "subject": "Gloria, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:58.796147+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.30999958535@smtp-relay.mailin.fr>",
    "email": "griggs@brickellparkcapital.com",
    "subject": "George, the lead you already paid for",
    "sent_at": "2026-10-30T10:17:59.481716+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.65216351729@smtp-relay.mailin.fr>",
    "email": "emmanuel@brightwavecapital.com",
    "subject": "Emmanuel, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:00.429203+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.67241090685@smtp-relay.mailin.fr>",
    "email": "moisesdasilva@brivincorp.com",
    "subject": "Moises, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:01.267630+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.44182488669@smtp-relay.mailin.fr>",
    "email": "idiaz@groupp6.com",
    "subject": "Ignacio, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:02.171195+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.75746523143@smtp-relay.mailin.fr>",
    "email": "luciana@carvalhocre.com",
    "subject": "Luciana, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:03.103788+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.65616149052@smtp-relay.mailin.fr>",
    "email": "jaquanne.peterson@cbre.com",
    "subject": "Jaquanne, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:04.045116+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.40775262379@smtp-relay.mailin.fr>",
    "email": "elizabeth.rogerio@cbre.com",
    "subject": "Elizabeth, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:04.864920+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.23575521400@smtp-relay.mailin.fr>",
    "email": "asua@cgrflorida.com",
    "subject": "Astrith, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:05.554652+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.89621484695@smtp-relay.mailin.fr>",
    "email": "mauricio@cityhouse.us",
    "subject": "Mauricio, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:06.366540+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.38571274083@smtp-relay.mailin.fr>",
    "email": "mcoletti@colettidevgroup.com",
    "subject": "Michael, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:07.210503+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.88883154710@smtp-relay.mailin.fr>",
    "email": "dayanne.costa@compass.com",
    "subject": "Dayanne, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:08.108367+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.27589790012@smtp-relay.mailin.fr>",
    "email": "damian.kosydar@compass.com",
    "subject": "Damian, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:08.843255+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.40037129781@smtp-relay.mailin.fr>",
    "email": "christine.caraccia@concordhotels.com",
    "subject": "Christine, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:09.642323+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.96792738170@smtp-relay.mailin.fr>",
    "email": "khalid.williams@cwservices.com",
    "subject": "Khalid, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:10.444975+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.67612437005@smtp-relay.mailin.fr>",
    "email": "bradley.colmer@decocapital.com",
    "subject": "Bradley, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:11.201063+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.57537190419@smtp-relay.mailin.fr>",
    "email": "sguasch@definedcos.com",
    "subject": "Steven, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:12.067687+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.61416440206@smtp-relay.mailin.fr>",
    "email": "kanwaljit@dhunnacapital.com",
    "subject": "Kanwaljit, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:12.877330+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.51044397072@smtp-relay.mailin.fr>",
    "email": "teo@eliteoceanviewrealty.com",
    "subject": "Teo, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:13.682446+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.46952241772@smtp-relay.mailin.fr>",
    "email": "kevin@epicfloridahomes.com",
    "subject": "Kevin, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:14.496313+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.16393817575@smtp-relay.mailin.fr>",
    "email": "cynthia@empiretitleservices.com",
    "subject": "Cynthia, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:15.314279+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.27174435133@smtp-relay.mailin.fr>",
    "email": "d.babanin@iqosa.com",
    "subject": "Dmitry, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:16.027961+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.42483655313@smtp-relay.mailin.fr>",
    "email": "noel@epelboim.com",
    "subject": "Noel, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:16.952939+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.82129979978@smtp-relay.mailin.fr>",
    "email": "curbshott@equigrowth.com",
    "subject": "Chad, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:17.634952+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.85894668956@smtp-relay.mailin.fr>",
    "email": "eric@erafit.com",
    "subject": "Eric, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:18.437269+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.88025046323@smtp-relay.mailin.fr>",
    "email": "ricardo@fincapitalinvestments.com",
    "subject": "Ricardo, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:19.314551+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.85184211740@smtp-relay.mailin.fr>",
    "email": "nathalia@fincapitalinvestments.com",
    "subject": "Nathalia, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:20.410490+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.12931685006@smtp-relay.mailin.fr>",
    "email": "david@fir.com",
    "subject": "David, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:21.212393+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.17465438747@smtp-relay.mailin.fr>",
    "email": "srenard@fortuneintlgroup.com",
    "subject": "Sophie, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:22.003635+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.70568580142@smtp-relay.mailin.fr>",
    "email": "mbotello@fortuneintlgroup.com",
    "subject": "Melissa, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:22.701359+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.42775564439@smtp-relay.mailin.fr>",
    "email": "mgonzalez-ortiz@fortuneintlgroup.com",
    "subject": "Maritza, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:23.486437+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.79074045795@smtp-relay.mailin.fr>",
    "email": "galfonso@fvpre.com",
    "subject": "Gus, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:24.343714+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.45002836868@smtp-relay.mailin.fr>",
    "email": "shai@ghg-inv.com",
    "subject": "Shai, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:25.123438+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.10359595915@smtp-relay.mailin.fr>",
    "email": "tpichet@globaltyinvestment.com",
    "subject": "Thomas, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:25.972439+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.91766846645@smtp-relay.mailin.fr>",
    "email": "erika@granathrealty.com",
    "subject": "Erika, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:26.792935+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.60044719007@smtp-relay.mailin.fr>",
    "email": "stan@harvardmaint.com",
    "subject": "Stan, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:27.664130+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.81107572338@smtp-relay.mailin.fr>",
    "email": "hanan@hbparealty.com",
    "subject": "Hanan, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:28.560849+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.54247803488@smtp-relay.mailin.fr>",
    "email": "kerry@anniemacworx.com",
    "subject": "Kerry, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:29.425393+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.54206738015@smtp-relay.mailin.fr>",
    "email": "sbisnoff@hostymosty.co",
    "subject": "Susan, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:30.294015+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.66462340097@smtp-relay.mailin.fr>",
    "email": "timothy@iconicequitiesgroup.com",
    "subject": "Tim, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:31.158356+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.19029906938@smtp-relay.mailin.fr>",
    "email": "ben@iconrealty.com",
    "subject": "Benjamin, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:32.109193+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.32176479942@smtp-relay.mailin.fr>",
    "email": "haydee.leto@ihg.com",
    "subject": "Haydee, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:32.954749+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.58176275526@smtp-relay.mailin.fr>",
    "email": "okrzeminski@inspectionsflorida.com",
    "subject": "Odalis, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:33.829655+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.66782689149@smtp-relay.mailin.fr>",
    "email": "rodney.langer@investorscre.com",
    "subject": "Rodney, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:34.578069+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.54256558126@smtp-relay.mailin.fr>",
    "email": "cathleen@chrislarenterprises.com",
    "subject": "CATHLEEN, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:35.484701+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.94818945195@smtp-relay.mailin.fr>",
    "email": "jack@jackcodengroup.com",
    "subject": "Jack, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:36.392392+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.37459908001@smtp-relay.mailin.fr>",
    "email": "spencer@jonisrealty.com",
    "subject": "Spencer, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:37.496989+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.86381769093@smtp-relay.mailin.fr>",
    "email": "julie@juliesrealty.net",
    "subject": "Yuliya, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:38.348126+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.54663430500@smtp-relay.mailin.fr>",
    "email": "acalleja@kasasrealty.com",
    "subject": "Angela, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:39.148820+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.24394543847@smtp-relay.mailin.fr>",
    "email": "tbartelmo@kislak.com",
    "subject": "Tom, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:39.868483+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.39929002353@smtp-relay.mailin.fr>",
    "email": "don.dewoody@landmarkcra.com",
    "subject": "Don, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:40.715532+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.89003293453@smtp-relay.mailin.fr>",
    "email": "tbrazy@landmarkdividend.com",
    "subject": "Tim, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:41.526278+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.53015998348@smtp-relay.mailin.fr>",
    "email": "cameron@laspalmascapital.us",
    "subject": "Cameron, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:42.200917+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.72762758678@smtp-relay.mailin.fr>",
    "email": "elvis@gpestates.com",
    "subject": "Elvis, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:43.030697+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.82437727446@smtp-relay.mailin.fr>",
    "email": "steve@localreco.com",
    "subject": "Stephen, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:43.897776+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.77600244603@smtp-relay.mailin.fr>",
    "email": "atilla@loftonconsulting.com",
    "subject": "Atilla, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:44.771038+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.84480215228@smtp-relay.mailin.fr>",
    "email": "ldrody@lowellinternationalrealty.com",
    "subject": "Lani, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:45.712439+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.84598666050@smtp-relay.mailin.fr>",
    "email": "karla@luxurylivingrealty.com",
    "subject": "Karla, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:46.601489+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.11042645644@smtp-relay.mailin.fr>",
    "email": "jennie@marinatitle.com",
    "subject": "Jennie, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:47.436655+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.37745635258@smtp-relay.mailin.fr>",
    "email": "john@miamicasabuyers.com",
    "subject": "John, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:48.311902+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.64239739165@smtp-relay.mailin.fr>",
    "email": "francesco@miamidreamsrealty.com",
    "subject": "Francesco, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:49.122415+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.63296564794@smtp-relay.mailin.fr>",
    "email": "claudioprattico@neptunepartners.eu",
    "subject": "Claudio, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:49.934295+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.44099990206@smtp-relay.mailin.fr>",
    "email": "george@oneblinc.com",
    "subject": "George, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:50.764834+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.17922778143@smtp-relay.mailin.fr>",
    "email": "david@parkavecap.com",
    "subject": "David, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:51.605326+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.19266129502@smtp-relay.mailin.fr>",
    "email": "ralph@penaappraisal.com",
    "subject": "Ralph, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:52.398363+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.28018998443@smtp-relay.mailin.fr>",
    "email": "gbeekman@pensamcapital.com",
    "subject": "gavin, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:53.217723+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.76723723780@smtp-relay.mailin.fr>",
    "email": "jason@perezdubois.com",
    "subject": "Jason, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:54.019833+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.71487257517@smtp-relay.mailin.fr>",
    "email": "phoudard@pipelineworkspaces.com",
    "subject": "Philippe, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:54.730283+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.21404338876@smtp-relay.mailin.fr>",
    "email": "joanna@quartzproperties.com",
    "subject": "Joanna, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:55.596049+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.24352502114@smtp-relay.mailin.fr>",
    "email": "leandro@reallrealty.com",
    "subject": "Leandro, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:56.411567+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.91117312623@smtp-relay.mailin.fr>",
    "email": "remy@realt.co",
    "subject": "Rémy, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:57.363165+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.69037684123@smtp-relay.mailin.fr>",
    "email": "frobinette@robinettehomes.com",
    "subject": "Ford, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:58.032635+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301018.51571136334@smtp-relay.mailin.fr>",
    "email": "bross@ross-realty.com",
    "subject": "Barry, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:58.856061+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.59494054013@smtp-relay.mailin.fr>",
    "email": "sam@realidinc.com",
    "subject": "Sam, the lead you already paid for",
    "sent_at": "2026-10-30T10:18:59.723515+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.10641724681@smtp-relay.mailin.fr>",
    "email": "scaster@samosetre.com",
    "subject": "Steven, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:00.466437+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.50823492469@smtp-relay.mailin.fr>",
    "email": "flavio@sherlockfinder.com",
    "subject": "Flavio, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:01.246920+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.35344562656@smtp-relay.mailin.fr>",
    "email": "rsieber@sieberinternational.com",
    "subject": "Ruedi, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:02.284260+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.19415171088@smtp-relay.mailin.fr>",
    "email": "jgranados@sol-depot.com",
    "subject": "Jorge, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:03.127193+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.91708603319@smtp-relay.mailin.fr>",
    "email": "es@solomonhomes.info",
    "subject": "Eric, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:04.019572+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.68229101790@smtp-relay.mailin.fr>",
    "email": "lori@sterlingteetor.com",
    "subject": "Lori, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:05.073884+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.43283623209@smtp-relay.mailin.fr>",
    "email": "jackson@syndigatecapital.com",
    "subject": "Jackson, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:05.970422+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.72616998169@smtp-relay.mailin.fr>",
    "email": "asarduy@synergyrealtymiami.com",
    "subject": "Andros, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:06.761050+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.57658197485@smtp-relay.mailin.fr>",
    "email": "simon@condostorecanada.com",
    "subject": "Simon, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:07.627248+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.87670156504@smtp-relay.mailin.fr>",
    "email": "nicole@the5starhost.com",
    "subject": "Nicole, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:08.386941+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.63024733848@smtp-relay.mailin.fr>",
    "email": "rgood@thegoodgroup.com",
    "subject": "Robert, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:09.219735+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.28710019495@smtp-relay.mailin.fr>",
    "email": "pablo@thehypegroup.com",
    "subject": "Pablo, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:10.062872+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.43865234553@smtp-relay.mailin.fr>",
    "email": "behzad@thesouferiangroup.com",
    "subject": "Behzad, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:10.909767+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.49285667462@smtp-relay.mailin.fr>",
    "email": "hucasro@treevita.com",
    "subject": "Hugo, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:11.696938+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.66282573151@smtp-relay.mailin.fr>",
    "email": "drittenhouse@trinitas.ventures",
    "subject": "David, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:12.486728+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.75921967596@smtp-relay.mailin.fr>",
    "email": "rmillard@trusthospitality.com",
    "subject": "Richard, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:13.230419+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.37614077227@smtp-relay.mailin.fr>",
    "email": "kristine@urbanizeproperties.com",
    "subject": "🌴Kristine, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:13.921916+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.37178599155@smtp-relay.mailin.fr>",
    "email": "andrea@vellamiami.com",
    "subject": "Andrea, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:14.748986+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.58438184314@smtp-relay.mailin.fr>",
    "email": "mark@whi-fl.com",
    "subject": "Mark, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:15.633531+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.67489735950@smtp-relay.mailin.fr>",
    "email": "erodrigues@williamsislandclub.com",
    "subject": "Edward, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:16.514879+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.70877936527@smtp-relay.mailin.fr>",
    "email": "adrian@wiremiami.com",
    "subject": "Adrian, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:17.493374+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.83947866706@smtp-relay.mailin.fr>",
    "email": "sofia@wiseowlcompany.com",
    "subject": "Sofia, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:18.237079+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.64404279182@smtp-relay.mailin.fr>",
    "email": "mary@personalhomemanagement.net",
    "subject": "Mary, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:19.033579+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.38533774455@smtp-relay.mailin.fr>",
    "email": "john@tothrealty.net",
    "subject": "John, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:19.878403+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610301019.16369336109@smtp-relay.mailin.fr>",
    "email": "mcohen@amgfamilyrealty.com",
    "subject": "Marty, the lead you already paid for",
    "sent_at": "2026-10-30T10:19:20.800600+00:00",
    "source": "nonopeners-2026-10-30"
  },
  {
    "messageId": "<202610300935.88283687611@smtp-relay.mailin.fr>",
    "email": "dreikeme@adoniamedicalclinic.co.uk",
    "subject": "Collab opportunity — SIXTY affiliate program",
    "sent_at": "2026-10-30T09:35:00+00:00",
    "source": "ifeoma-proposal-2026-10-30"
  }
];
