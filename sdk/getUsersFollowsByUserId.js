const Requester = require("../lib/utility/request/requester");
module.exports = function getUsersFollowsByUserId(params, callback, optionalParams) {
    const options = optionalParams || require("../conf/config.js").getUsersFollowsByUserId;
    const Request = new Requester(options, params);
    Request.makeRequest(function (err, resp) {
        if (err) {
            callback(err)
        } else {
            callback(null, resp)
        }
    })
};