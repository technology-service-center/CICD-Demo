var fs = require('fs');
fs.readFile('ctrf/ctrf-report.json', 'utf-8', function (err, data) {
    if (err) throw err;

    var obj = JSON.parse(data);
    console.log(obj.results.summary.failed);
    if(obj.results.summary.failed != 0){
        var failed_tests = [];
        for(var i = 0; i < obj.results.summary.tests; i++){
            if(obj.results.tests[i].status == "failed"){
                failed_tests.push(obj.results.tests[i]);
            }
        } 
        for(var i = 0; i < failed_tests.length; i++){
            var errorMessage = failed_tests[i].message.split("Call log:")
            var browser = failed_tests[i].suite.split(" >");
            fetch(
                process.env.DISCORD_WEBHOOK_URL,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        // the username to be displayed
                        username: 'Playwright Test Reporter',
                        content: "❌TSC Health Check Failed (" + browser[0] + "): \n Test: \"" + failed_tests[i].name + "\" \n" + errorMessage[0],
                    }),
                }
            );
        }
    }
});
