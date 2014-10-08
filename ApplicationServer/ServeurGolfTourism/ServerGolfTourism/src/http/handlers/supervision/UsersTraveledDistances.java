/**   \author Adrien ORTOLA */
package http.handlers.supervision;

import http.handlers.CustomizedHandler;
import http.users.SetOfUsers;
import java.io.OutputStream;
import java.util.LinkedList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import json.JSONBuilder;
import com.sun.net.httpserver.HttpExchange;

/**
 * \class UsersTraveledDistances
 * \brief  extends CustomizedHandler
 *	The purpose of this class is to get and return a collection of all the distances of the users (even disconnected ones).
 * */
public class UsersTraveledDistances extends CustomizedHandler  {

	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief get and return a collection of all the distances of the users (even disconnected ones)
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("traveledDistances",prepareListOfDistances(SetOfUsers.listOfDistances()));
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
	
	/** 
	 * \param LinkedList<Float> list
	 * \return JSONArray
	 * \brief Prepare a list of distances by inserting them into a JSONArray
	 * */
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
