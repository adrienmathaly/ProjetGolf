/**   \author Adrien ORTOLA */
package http.handlers.supervision;

import java.io.OutputStream;
import java.util.HashMap;
import java.util.LinkedList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import http.handlers.CustomizedHandler;
import http.users.Quadruplet;
import http.users.SetOfUsers;

/**
 * \class AllTheData
 * \brief Extends CustomizedHandler.
 *  The purpose of this class is to get all the data concerning the users and forwarding them to a supervision client.
 * */
public class AllTheData extends CustomizedHandler{

	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief Collects all possible data from the general set of users. 
	 * (Amount of users, number of current games, total of all summed distances, best summed distance, personal users details...)
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		  HashMap<String,Object> response = new HashMap<String,Object>();
	      response.put("amountOfUsers", SetOfUsers.amountOfUsers());
	      response.put("currentGames", SetOfUsers.numberOfActiveGames());
	      response.put("totalDistances", SetOfUsers.totalOfAllDistances());
	      response.put("bestDistance", SetOfUsers.getBestDistance());
	      response.put("usersDetails", prepareListOfEveryStats(SetOfUsers.listOfEveryStats()));
	      JSONObject jsono = new JSONObject();
	      jsono.putAll(response);
	      String responseString=jsono.toJSONString();
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, responseString.length());
	      OutputStream os = t.getResponseBody();
	      os.write(responseString.getBytes());
	      os.close();
	}
	
	/** 
	 * \param LinkedList<Quadruplet> list
	 * \return JSONArray 
	 * \brief Prepares a list of every statistics into a JSONArray
	 * */
	private JSONArray prepareListOfEveryStats(LinkedList<Quadruplet> list){
		JSONArray listOfEveryStats=new JSONArray();
		while(!list.isEmpty()){
			Quadruplet t=list.pop();
			JSONObject jo = new JSONObject();
			jo.put("lat",t.getLatitude());
			jo.put("lng",t.getLongitude());
			jo.put("distance",t.getDistance());
			jo.put("alive",t.getAlive().toString());
			listOfEveryStats.add(jo);
		}
		return listOfEveryStats;
	}
}
