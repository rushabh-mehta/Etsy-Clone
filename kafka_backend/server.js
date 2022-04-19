var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Login = require('./kafka_services/login.js');
var Register = require('./kafka_services/register.js');
var Country = require('./kafka_services/country.js');
var Category = require('./kafka_services/category.js');
var User = require('./kafka_services/user.js');
var Cart = require('./kafka_services/cart.js');
var FavoriteItem = require('./kafka_services/favoriteitem.js');
var Order = require('./kafka_services/order.js');



const mongoose = require('mongoose');
const { mongoDB } = require('./config/mongo-config');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});



function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login",Login);
handleTopicRequest("register",Register);
handleTopicRequest("country",Country);
handleTopicRequest("category",Category);
handleTopicRequest("user",User);
handleTopicRequest("cart",Cart);
handleTopicRequest("favoriteitem",FavoriteItem);
handleTopicRequest("order",Order);


