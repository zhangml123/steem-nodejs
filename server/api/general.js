import { getFile , hash , getContentByAccount , addFiles, readFiles ,voting} from "../../libs/fileSystem"

function setHeaders(res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("X-Powered-By",' 3.2.1')
}

export default function indexApi(app){
	app.all("/api/getfile",function(req,res){
		setHeaders(res);
	    if(req.method == "OPTIONS" || req.method == "POST" ){
			var arr = [];
			var chunks
			req.on('data', buff => {
	        	arr.push(buff);
	   		});
	   		req.on('end', () => {
		        chunks = Buffer.concat(arr);
		        if(chunks.toString()){
		        	var json = JSON.parse( chunks.toString());
		        }else{
		        	var json=""
		        }
		        getFile("",(rs)=>{
				res.send({
					url:rs.url,
					fileName:rs.fileName,
					});
		        });
		    });
	    }else{
	    }
	});


	app.all("/api/getcontent",function(req,res){
		setHeaders(res);
	    if(req.method == "OPTIONS" || req.method == "POST" ){
			var arr = [];
			var chunks
			req.on('data', buff => {
	        	arr.push(buff);
	   		});
	   		req.on('end', () => {
		        chunks = Buffer.concat(arr);
		        if(chunks.toString()){
		        	var json = JSON.parse( chunks.toString());
			        getContentByAccount(json.account,(rs)=>{
					res.send({
						content:JSON.parse(rs).content
						});
			        });
		        }else{
		        	res.send();
		        }
		    });
	    }else{
	    }
	});
	app.all("/api/addOrReadFile",function(req,res){
		setHeaders(res);
		if(req.method == "OPTIONS" || req.method == "POST" ){
			var arr = [];
			var chunks
			req.on('data', buff => {
	        	arr.push(buff);
	   		});
	   		req.on('end', () => {
		        chunks = Buffer.concat(arr);
		        if(chunks.toString()){
		        	try{
		        		var json = JSON.parse( chunks.toString());
		        	}catch(e){
		        		res.send(404,{msg:"数据格式错误"});
            			return false;
		        	}
					if(json.type == "add" ){
						addFiles(json,(rs)=>{
						res.send(rs);
				       	});
					}else if(json.type == "read"){
						readFiles(json,(rs)=>{
							res.send(rs);
				        });
					}
		        }else{
		        	res.send();
		        }
		    });
	    }else{

	    }
	})

	app.all("/api/vote",function(req,res){
		setHeaders(res);
		if(req.method == "OPTIONS" || req.method == "POST" ){
			var arr = [];
			var chunks
			req.on('data', buff => {
	        	arr.push(buff);
	   		});
	   		req.on('end', () => {
		        chunks = Buffer.concat(arr);
		        if(chunks.toString()){
		        	try{
		        		var json = JSON.parse( chunks.toString());
		        	}catch(e){
		        		res.send(404,{msg:"数据格式错误"});
            			return false;
		        	}
					voting(json,(rs)=>{
						res.send(rs);
			       	});
					
		        }else{
		        	res.send();
		        }
		    });
	    }else{

	    }
	})







	app.post("/api/hash",function(req,res){
		var arr = [];
		var chunks
		req.on('data', buff => {
        	arr.push(buff);
        		
   		});
   		req.on('end', () => {
	        chunks = Buffer.concat(arr);
	        var json = JSON.parse( chunks.toString());
	      	hash(json.url,(rs) => {
				res.send({hash:rs});
	      	});
	    });
	
	});

	



}
