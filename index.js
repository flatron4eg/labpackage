const promise = require('bluebird');
const needle = promise.promisifyAll(require('needle'));

module.exports.byName =  function (name){
    return new Promise((resolve, reject) => {
        needle.getAsync('https://api.github.com/users/'+name+'/repos?per_page=10').
        then((data)=>{
            var objs = [];
            data.body.forEach(function(val){
                var obj = {
                    id:val.id,
                    name: val.name,
                    url: val.url
                };
                objs.push(obj);
            });
            resolve(objs);
        });
    });
};

module.exports.byString = function (q){
    return new Promise((resolve, reject) => {
        needle.getAsync('https://api.github.com/search/repositories?q='+q+'&per_page=10').
        then((data)=>{
            var objs = [];
            data.body.items.forEach(function(val){
                var obj = {
                    id:val.id,
                    name: val.name,
                    owner:val.owner,
                    url: val.url
                };
                objs.push(obj);
            });
            resolve(objs);
        });
    });
};

module.exports.byRep = function (rep){
    return new Promise((resolve, reject) => {
        needle.getAsync('https://api.github.com/repos/'+rep.owner.login+'/'+rep.name+'/commits?per_page=10').
        then((data)=>{
            var objs = [];
            data.body.forEach(function(val){
                var obj = {
                    sha:val.sha,
                    author: val.author,
                    message:val.commit.message,
                    date:val.commit.committer.date
                };
                objs.push(obj);
            });
            resolve(objs);
        });
    });
};