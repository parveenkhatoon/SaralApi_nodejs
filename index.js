
var fs = require('fs');
const d = require('readline-sync');
const request = require('request')

request('http://saral.navgurukul.org/api/courses', (error, response, body) => {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    fs.writeFile('saralData.json', body, (err) => {
            console.log("data has inserted");
        fs.readFile("saralData.json", (err, data) => {
            var mydata = JSON.parse(data)
            var no = 0
            for (var i in mydata["availableCourses"]) {
                console.log(no += 1, mydata["availableCourses"][i]["name"], mydata["availableCourses"][i]["id"])
            };
            const courseName = d.question('Enter the course:');
            console.log(mydata["availableCourses"][courseName - 1]["name"])
            request("https://saral.navgurukul.org/api/courses/" + mydata["availableCourses"][courseName - 1]["id"] + "/exercises", (error, response, body) => {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
                fs.writeFile('perentData.json', body, (err, dete) => {
                    console.log("data has inserted");
                    fs.readFile("perentData.json", (err, data) => {
                        var PData = JSON.parse(data)
                        const PerentData = PData["data"]
                        var i = 0
                        while (i < PerentData.length) {
                            console.log(i + 1, PerentData[i]["name"])
                            var j = 0
                            var count = 1
                            while (j < PerentData[i]["childExercises"].length) {
                                console.log(`       ${count} ${PerentData[i]["childExercises"][j]["name"]}`)
                                count += 1
                                j++
                            }
                            i++
                        }
                        var select_parent = d.question("select the chiled:");
                        console.log(PerentData[select_parent - 1]["name"])
                        var count1 = 1
                        for (var index in PerentData[select_parent - 1]["childExercises"]) {
                            console.log(`${count1} ${PerentData[select_parent - 1]["childExercises"][index]["name"]}`)
                            count1 += 1
                        }
                        var Up_Navigation = d.question("Enter 'up' for going back to all courses:")
                        if (Up_Navigation == "up") {
                            let no = 1
                            for (var l in mydata["availableCourses"]) {
                                console.log(no, mydata["availableCourses"][l]['name'], mydata["availableCourses"][l]['id'])
                                no += 1
                            }
                            var select_course = d.question("select your courses:")
                            console.log(mydata["availableCourses"][select_course - 1]["name"])
                            request("https://saral.navgurukul.org/api/courses/" + mydata["availableCourses"][select_course - 1]["id"] + "/exercises", (error, response, body) => {
                                console.log('error:', error); // Print the error if one occurred
                                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                                console.log('body:', body); // Print the HTML for the Google homepage.
                                fs.writeFile('perentData.json', body, (err, dete) => {
                                    console.log("data has inserted");
                                    fs.readFile("perentData.json", (err, data) => {
                                        var Data = JSON.parse(data)
                                        const Perent1 = Data["data"]
                                        var no_1 = 1
                                        for (var index1 in Perent1) {
                                            console.log(no_1, Perent1[index1]["name"])
                                            no_1 += 1
                                            let count3 = 1
                                            for (var j in Perent1[index1]["childExercises"]) {
                                                console.log(`       ${count3} ${Perent1[index1]["childExercises"][j]["name"]}`)
                                                count += 1
                                            }
                                        }
                                    });
                                });
                            });
                        }
                        var select_child = d.question("select the slug:");
                        var slug = PerentData[select_parent - 1]["childExercises"][select_child - 1]['slug']
                        request("http://saral.navgurukul.org/api/courses/" + mydata["availableCourses"][select_child - 1]['id'] + "/exercise/getBySlug?slug=" + slug, (error, response, body) => {
                            console.log('error:', error);
                            console.log('statusCode:', response && response.statusCode);
                            console.log('body:', body);
                            fs.writeFile('content.json', body, (err, data) => {
                                fs.readFile('content.json', (err, data) => {
                                    var conData = JSON.parse(data)
                                    console.log(conData['content'])
                                })
                            });
                        });
                    });
                });
            });
        });
    });
});
                                                                                                                                                     


