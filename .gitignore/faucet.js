module.exports = function(robot) {
  robot.messageRoom('_faucet', 'Faucet has been started, simply post your ether address!');
  robot.hear(/0x[a-fA-F0-9]{40}/i, function(res) {
    var url = "http://fundrequest-rinkeby-faucet:3002/faucet?address=" + res.match[0];
    res.robot.http(url).get()(function (err, resp, body) {
      if (err) {
        robot.messageRoom('_governance', 'Faucet failed...' + err);
      } else {
        res.send(body);
      }
    });
  });
};
