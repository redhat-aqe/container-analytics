window.addEventListener('rhAnalyticsTimespanChanged', async function(event) {
  var days = event.detail.days;
  var element = document.getElementsByTagName('redhat-container-analytics')[0];

  var baseUrl = 'https://pyxis.stage.engineering.redhat.com/v1' +
                '/repositories/registry/registry.access.redhat.com' +
                '/repository/ubi8/analytics/';
  var pullCountUrl = baseUrl + 'pull-counts?delta=' + days;
  var pageViewUrl = baseUrl + 'pageviews?delta=' + days;

  var pullCountRsp = await fetch(pullCountUrl, {cache: 'no-store'});
  var pageViewRsp = await fetch(pageViewUrl, {cache: 'no-store'});

  if (pullCountRsp.ok) {
    element.pullCountStats = await pullCountRsp.json();
  } else {
    console.error(await pullCountRsp.text());
  }

  if (pageViewRsp.ok) {
    element.pageViewStats = await pageViewRsp.json();
  } else {
    console.error(await pageViewRsp.text());
  }
});