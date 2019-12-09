function onPullCountStats() {
  if (this.status === 200) {
    var element = document.getElementsByTagName('redhat-container-analytics')[0];
    element.pullCountStats = JSON.parse(this.responseText);
  } else {
    console.error(this.responseText);
  }
}

function onPageViewStats() {
  if (this.status === 200) {
    var element = document.getElementsByTagName('redhat-container-analytics')[0];
    element.pageViewStats = JSON.parse(this.responseText);
  } else {
    console.error(this.responseText);
  }
}

window.addEventListener('rhAnalyticsTimespanChanged', function(event) {
  var days = event.detail.days;

  var pullCountReq = new XMLHttpRequest();
  pullCountReq.addEventListener('load', onPullCountStats);
  pullCountReq.open('GET', 'https://pyxis.stage.engineering.redhat.com/v1' +
                           '/repositories/registry/registry.access.redhat.com' +
                           '/repository/ubi8/analytics/pull-counts?delta=' + days);
  pullCountReq.send();

  var pageViewReq = new XMLHttpRequest();
  pageViewReq.addEventListener('load', onPageViewStats);
  pageViewReq.open('GET', 'https://pyxis.stage.engineering.redhat.com/v1' +
                          '/repositories/registry/registry.access.redhat.com' +
                          '/repository/ubi8/analytics/pageviews?delta=' + days);
  pageViewReq.send();
});