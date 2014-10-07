package http.handlers.supervision;

import http.handlers.CustomizedHandler;
import http.users.Point;
import http.users.SetOfUsers;

import java.io.OutputStream;
import java.util.LinkedList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import json.JSONBuilder;

import com.sun.net.httpserver.HttpExchange;


public class UsersTravelledDistances extends CustomizedHandler  {

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("travelledDistances",prepareListOfDistances(SetOfUsers.listOfDistances()));
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
	
	
	private JSONArray prepareListOfDistances(LinkedList<Float> list){
		JSONArray listOfDistances=new JSONArray();
		 while(!list.isEmpty()){
			JSONObject jo = new JSONObject();
			jo.put("dist",list.pop());
			listOfDistances.add(jo);
		}
		return listOfDistances;
	}
}
