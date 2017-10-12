var fs = require("fs");
var path = require('path');
var SHA1  = require("crypto-js/md5");  
var root_dir = path.join(__dirname,'../');

import models from "../db/models";
import steem  from "steem";
export function getFile(url,callback){


	var url =  root_dir + "upload/video/637226_20170113172352883020_1.jpg";
	var fileName = "video.mp4";
	callback({
		fileName:fileName,
		url:url,
		createTime:"",
		uploadTime:"",
	});
}

export function hash(url,callback){
	var url = root_dir + "upload/video/637226_20170113172352883020_1.jpg";
 	fs.exists(url, function(exists) {
	    if(exists){
	    	var video  = fs.readFile(url,"hex",(err,data)=>{
				if(err) throw err;
				var rs = SHA1(data).toString();
	    		callback(rs)
			});
	    }else{
	    	var rs = "文件不存在";
	    	callback(rs)
	    }

	});
}

export function getContentByAccount(account,callback){

	console.log(account)
   /* var content = models.User.findOne(
    	{attributes:['id']}
    )*/
    var user = models.User.findOne(
                {attributes: ['verified', 'waiting_list'], where: {id: 1}}
            );

	models.User.findAll().then(users => {
	  console.log(users)
	})

    console.log(user)

	/*steem.api.getState('@dan', function(err, result) {

		console.log(result)
		if(err){
			//var rs = JSON.stringify({err:err});
			console.log(err)
		}else{
			var rs = JSON.stringify({content:result});
		}
  		callback(rs);
	});*/

}

export function addFiles(json,callback){
	if(json){
		var obj = {};
		obj.username = json.username;
		obj.filename = json.filename;
		obj.hash = json.hash;
		obj.url = json.url;
		obj.create_time = json.create_time;
		var code = SHA1(obj.username+1).toString();
	//发布文章/所有权
		var wif = json.wif;
		var parentAuthor = "";
		var parentPermlink = "videostore-1";
		var author = obj.username;
		var permlink = "videostore-"+obj.username+"-"+obj.create_time;
		var title = obj.username+"-"+obj.hash+"-"+code;
		var body = "is-"+obj.username+"-"+obj.filename+"-"+obj.url;
		var jsonMetadata = {tags:[obj.hash],app:"steemit/0.1"};
		console.log("post")
		steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
  			console.log(err, result);

  			if(result){
				callback({result:true})
  			}else{
  				callback({result:err})
  			}
		});




	// 版权交易/

		/*var wif = "5JYN2aoUXqCs83CvRA7RuBr82dtVjs2grRSBrMRK6GUhyLt4Zse";
		var parentAuthor = "";
		var parentPermlink = "";
		var author = obj.username;
		var permlink = obj.hash+"-"+obj.create_time;
		var title = obj.username1+"-"+obj.hash+"-"+code;
		var body = "to-"+obj.username1+"-100$"+"-"+obj.create_time;
		var jsonMetadata = {tags:[obj.hash],app:"steemit/0.1"};

		steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
  			console.log(err, result);
		});
*/

		

		/*
		models.User.findOne({
			attributes:['id'],where:{name:obj.username}
		}).then(rs => {
			if(rs){
				obj.uid = rs.get("id");
				db_saveFile(obj,callback);
			}else{
				callback({result:"username is no found"})
			}
		})*/
	}
}


export function readFiles(json,callback){
		var account = json.account;
		steem.api.getState("@"+json.username, function(err, result) {
			//console.log(result)
			if(err){
				//var rs = JSON.stringify({err:err});
				console.log(err)
			}else{
				var content = result.content;
				var videos = [];
				for(var k in content){
					if(k.indexOf("videostore") > -1){
						console.log(content[k])
						var right = false;
						var votes = content[k]["active_votes"];
						console.log(votes)
						if(account == content[k]["author"] ){
							right = true;
						}else{

							votes.map((v,k)=>{
								if(account == v.voter){
									right = true;
								}
							})
						}
						var obj = {};
						obj.hash = JSON.parse(content[k]["json_metadata"]).tags[0];
						obj.username = content[k]["author"];
						var body = content[k]["body"].split("-");
						obj.filename = body[2];
						obj.url =  body[3];
						obj.right = right;
						obj.permlink = content[k]["permlink"];
						videos.push(obj);
					}
				}
				var rs = JSON.stringify({content:videos});
			}
	  		callback(rs);
		});
		/*steem.api.getState('created/MmWDon3yG4Baozq8xR784MXPV8BVLL5rH', function(err, result) {
			//console.log(result)
			if(err){
				//var rs = JSON.stringify({err:err});
				console.log(err)
			}else{
				var rs = JSON.stringify({content:result});
			}
	  		callback(rs);
		});*/

		//转账trx
		//var trx = {"ref_block_num":1340,"ref_block_prefix":2075049833,"expiration":"2017-06-22T12:15:24","operations":[["transfer",{"from":"akdjf","to":"asdfasdf","amount":"1.000 STEEM","memo":"good luck"}]],"extensions":[],"signatures":["1f42b49e82e891329e023e84df80e0fd48daf42bd4e715a821420d1b1eb84ca5a344a9b4ddf21563a7a6205dd5c7f0878f8c3f2acd1ea1e80ce7628fbcf392cfcf"]};
		//发布文章
		/*var parentAuthor = "";
		var parentPermlink = "poetry";
		var author = "akdjf";
		var permlink = "good-luck";
		var title = "good luck to you1";
		var body = "good luck to you";
		var jsonMetadata = '{"tags":["poetry"],"app":"steemit/0.1"}';
		var vote = {"voter":"akdjf","author":"akdjf","permlink":"good-luck","weight":10000}
		var operations = [["comment",{"parent_author":parentAuthor,"parent_permlink":parentPermlink,"author":author,"permlink":permlink,"title":title,"body":body,"json_metadata":jsonMetadata}]];
		var signatures =["1f63479f77fb15642e2494cf573488451f4eeb85e914a0f5f24a5a4b4c300638b4499bcc138d8d673f88b1cc172e2d8fe47d8e5da9e7c6922dc236957885c87b9c"]
		var extensions = [];
		var refBlockNum = 1111
		var refBlockPrefix = 111
		var expiration = ""
		

		

		/*
		//获取交易hash
		/*var trx = {"ref_block_num":1340,"ref_block_prefix":2075049833,"expiration":"2017-06-22T12:15:24","operations":[["transfer",{"from":"akdjf","to":"asdfasdf","amount":"1.000 STEEM","memo":"good luck"}]],"extensions":[],"signatures":["1f42b49e82e891329e023e84df80e0fd48daf42bd4e715a821420d1b1eb84ca5a344a9b4ddf21563a7a6205dd5c7f0878f8c3f2acd1ea1e80ce7628fbcf392cfcf"]};
		steem.api.getTransactionHex(trx, function(err, result) {
		  console.log(err, result);
		});*/

		
		//发布文章
		/*var wif = "5JYN2aoUXqCs83CvRA7RuBr82dtVjs2grRSBrMRK6GUhyLt4Zse";
		var parentAuthor = "";
		var parentPermlink = "poetry";
		var author = "akdjf";
		var permlink = "good-luck-to-you";
		var title = "good luck to you";
		var body = "steemit";
		var jsonMetadata = {tags:["poetry"],app:"steemit/0.1"};
		console.log("post")
		steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
  			console.log(err, result);
		});
*/


		/*getDynamicGlobalProperties((result1)=>{
					console.log("result11111111",result1)
					var headBlockNumber = result1.head_block_number;
					getRefBlockNum(headBlockNumber,(result2)=>{
						console.log("result21111111",result2)
					});
			});
		

		//评论
		var wif = "5JYN2aoUXqCs83CvRA7RuBr82dtVjs2grRSBrMRK6GUhyLt4Zse";
		var parentAuthor = "akdjf";
		var parentPermlink = "4nav7w";
		var author = "akdjf";
		var permlink = "re-akdjf-4nav7w-20170622t080522787z";
		var title = "";
		var body = "steemit";
		var jsonMetadata = {tags:["poetry"],app:"steemit/0.1"};

		steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
  			console.log("re11111111 = ",result)
		});


		console.log("//////////////////////////////////////////////////////////////////////////")

		getDynamicGlobalProperties((result1)=>{
			console.log("result1222222222",result1)

			var headBlockNumber = result1.head_block_number;
			getRefBlockNum(headBlockNumber,(result2)=>{
				console.log("result22222222",result2)
			});
				var headBlockId = result1.head_block_id;
				refBlockNum = headBlockNumber - 3 & 0xFFFF
				refBlockPrefix = new Buffer(headBlockId, 'hex').readUInt32LE(4)
				var chainDate = new Date(result1.time + 'Z');
				expiration = new Date(chainDate.getTime() + 60 * 1000);
				var trx = {"ref_block_num":refBlockNum,"ref_block_prefix":refBlockPrefix,"expiration":expiration,"extensions":extensions,"operations":operations};
				var availableKeys = {"posting":"5JYN2aoUXqCs83CvRA7RuBr82dtVjs2grRSBrMRK6GUhyLt4Zse"};
				var trx1 = steem.auth.signTransaction(trx,availableKeys);
				console.log("refBlockNum = ",refBlockNum);
				console.log("refBlockPrefix = ",refBlockPrefix);
				steem.api.broadcastTransactionWithCallback(null,trx1, function(err, result) {
					console.log("result2222222 = ",result)
					console.log(err)
					/*if(err){
						//var rs = JSON.stringify({err:err});
						console.log(err)
					}else{
						var rs = JSON.stringify({content:result});
					}
			  		callback(rs);*/
			/*	})
			
		});*/

		/*
	
		//投票
		var wif = "5JYN2aoUXqCs83CvRA7RuBr82dtVjs2grRSBrMRK6GUhyLt4Zse";
		var author = "penguinpablo";
		var voter = "akdjf";
		var permlink = "weekly-steem-stats-report-august-14-2017";
		var weight = 10000;

		steem.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
		  console.log(err, result);
		});*/


		/*
		steem.api.getDiscussionsByTrending({"tag":"","limit":20,"start_author":"deanliu","start_permlink":"the-way-of-laodr"}, function(err, result) {
			///console.log(result)
			if(err){
				//var rs = JSON.stringify({err:err});
				console.log(err)
			}else{
				var rs = JSON.stringify({content:result});
			}
	  		callback(rs);
		})*/

		




	//callback({ADS:"adsf"})

	/*
	if(json){
		console.log(json)
		if(json.username){//按用户名读取
			models.User.findOne({
				attributes:['id'],where:{name:json.username}
			}).then(rs => {
				if(rs){
					var uid = rs.get("id");
					db_readFile(uid,callback);
				}else{
					callback({result:"username is no found"})
				}
			})
		}else{//读取所有
			db_readFile("",callback);
		}

	}
	*/
}

export function voting(json,callback){
	var wif = json.wif;
	var author = json.account;
	var voter = json.username;
	var permlink = json.permlink;
	var weight = 10000;

	steem.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
	  console.log(err, result);
	});
}

function getDynamicGlobalProperties(cb){
	steem.api.getDynamicGlobalProperties(function(err, result) {
		if(err){
		  console.log(err);return;
		}
		if(result){
			cb(result);
		}
	})
}

function getRefBlockNum(blockId,cb){
	steem.api.getBlock(blockId,function(err, result) {
		if(err){
		  console.log(err);
		}
		if(result){
			cb(result);
		}
	})
}

function getRefBlockPrefix(){

}

function db_saveFile(obj,callback){

	console.log(obj.create_time)
	models.Video.create({
		uid:obj.uid,
		hash:obj.hash,
		filename:obj.filename,
		url:obj.url,
		create_time:obj.create_time
	}).then(rs=>{
		if(rs.get("id")){
			callback({result:true});
		}else{
			callback({result:true});
		}
	})
}
function db_readFile(uid,callback){
	if(uid){
		var find = {attributes:['uid','hash','filename','create_time','url'],where:{uid:uid}}
	}else{
		var find = {attributes:['uid','hash','filename','create_time','url']}
	}
	models.Video.findAll(find).then((rs)=>{
		if(rs){
			var arr = [];
			rs.map((v,k)=>{
				getUserName(v.get("uid"),(cb)=>{
					var obj = {};
					obj.uid = v.get("uid");
					obj.username = cb;
					obj.hash = v.get("hash");
					obj.filename = v.get("filename");
					obj.create_time = v.get("create_time");
					obj.url = v.get("url");
					arr.push(obj)
					if(arr.length == rs.length){
						callback({result:arr})
					}
				})
			})
		}else{
			callback({result:"not found"})
		}
	})
}
function getUserName(uid,callback){
	models.User.findOne({
		attributes:['name'],where:{uid:uid}
	}).then((rs)=>{
		if(rs){
			callback(rs.get("name")) ;
		}else{
			callback("") ;
		}
		
	})

}


