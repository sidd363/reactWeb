var moment = require('moment');
var redisClient = require('ioredis');
var config = require('../config');
var bunyan = require('bunyan')
  , log = bunyan.createLogger({name: 'RedisLog'});

module.exports = (function () {
  var connection = null;
  function connect(cb){
    try{
      if(!connection)
        return setConnection(cb);
      cb(connection);
    }catch(err){
      log.error({error:err},"Redis Create Connection Error");
      cb(null);
    }
  }

  function setConnection(cb){
    try{
      console.log("config===",config.redis.host)
      connection = redisClient.createClient(config.redis.port, config.redis.host);
      connection.select(config.redis.db);
      connection.on('ready',function(){
        cb(connection);
      });
      connection.on('end',function(){
        connection=null;
      });
      connection.on('error',function(){
        log.error({error:"Redis Connection Ended"},"Redis Connection Ended");
        connection=null;
      });
    }catch(err){
      log.error({error:err},"Redis Connection Error",err);
      cb(null);
    }
  }
  function disconnect(connection){
    try{
      connection.quit();
      connection=null;
    }catch(err){
      log.error({error:err},"Redis Connection Quit Error");
    }
  }


  function forceDisconnect(connection){
    try{
      connection.end();
    }catch(err){
      log.error({error:err},"Redis Connection End Error");
    }
  }
  return {
    expire: function(key,timeout,cb){
      try{
        connect(function(connection){
          connection.expire(key,timeout);

        });
      }catch(err){
        log.error({error:err},"Redis Expire Value Error");
        cb(err);
      }
    },
    set: function(key,value,cb){
      try{
        connect(function(connection){
          connection.set(key,value,function(err,value){
            if(err){
              log.error({error:err},"Redis Error");
              cb(err);
            }else
              cb(null,value);
          });

        });
      }catch(err){
        log.error({error:err},"Redis Set Value Error");
        cb(err);
      }
    },
    setWithExpire : function(key,value,timeout,cb){
      try{
        connect(function(connection){
          connection.set(key,value,'EX',timeout,function(err,value){
            if(err){
              log.error({error:err},"Redis Error");
              cb(err);
            }
            else{
              cb(null,value);
            }
          })
        })
      }catch(err){
        log.error({error:err},"Redis Set Value With Expire Error");
        cb(err);
      }
    },
    get: function(key,cb){
      try{
        connect(function(connection){
          connection.get(key,function(err,value){
            if(err){
              log.error({error:err},"Redis Error");
              cb(err);
            }else
              cb(null,value);
          });

        });
      }catch(err){
        log.error({error:err},"Redis Get Value Error");
        cb(err);
      }
    }
  };
})();
