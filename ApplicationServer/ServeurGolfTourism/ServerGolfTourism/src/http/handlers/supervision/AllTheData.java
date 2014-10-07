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

public class AllTheData extends CustomizedHandler{

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		  HashMap<String,Object> response = new HashMap<String,Object>();
	      response.put("amountOfUsers", SetOfUsers.amountOfUsers());
	      response.put("nbConnected", SetOfUsers.numberOfConnected());
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
