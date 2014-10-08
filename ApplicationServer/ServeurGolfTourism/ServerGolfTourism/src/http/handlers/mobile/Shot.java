/**   \author Adrien ORTOLA */
package http.handlers.mobile;

import http.database.DatabaseManager;
import http.handlers.PostHandler;
import http.users.Point;
import http.users.SetOfUsers;
import java.io.OutputStream;
import java.util.HashMap;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import com.sun.net.httpserver.HttpExchange;
import configuration.ConfLoader;

/**
 * \class Shot
 * \brief Implements PostHandler. The purpose of this class is to apply a shot made by a client.
 * */
public class Shot extends PostHandler{

	/** 
	 * \param httpExchange t
	 * \return void
	 * \brief Verifies the existence of the user. 
	 * Calculates the trajectory of the ball taking the "weather" in account. 
	 * Request the database for the closest POI from the given coordinates. 
	 * Starts a new game if the user is not already playing. 
	 * Modifies his/her traveled distance.
	 * Updates his/her location to this new point.
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		HashMap<String,Object> map = parseJSONInfo(t);
		String response="";
		if(SetOfUsers.containsToken((String) map.get("token"))){
			Point p = applyWeather((float)(double)map.get("ballLt"),(float)(double)map.get("ballLg"));
			DatabaseManager dbm = new DatabaseManager(formatDbRequest(p));
			dbm.connect("GET");
			response = dbm.getResponse();
			if(!SetOfUsers.isUserFullyCreated((String)map.get("token"))){
				SetOfUsers.setFirstLocationOf((String)map.get("token"),new Point((Float)(float)(double)map.get("userLt"),(Float)(float)(double)(map.get("userLg"))));
			}
			JSONObject jsono = (JSONObject) new JSONParser().parse(response);
			jsono.put("ballLg", p.getLongitude());
			jsono.put("ballLt", p.getLatitude());
			SetOfUsers.updateUserLocation((String)map.get("token"),p,new Point(Float.parseFloat((String)jsono.get("ltCity")),Float.parseFloat((String)jsono.get("lgCity"))));
			t.getResponseHeaders().add("Content-type", "json;charset=utf-8");
			response = jsono.toJSONString();
			t.sendResponseHeaders(201, response.length());
			OutputStream os = t.getResponseBody();
			os.write(response.getBytes());
			os.close();
		}else{
			t.sendResponseHeaders(401, response.length());
			OutputStream os = t.getResponseBody();
			os.write(response.getBytes());
			os.close();
		}
	}
	
	/** 
	 * \param Point p
	 * \return String
	 * \brief Formats the URL requesting the database, putting the latitude and longitude of the ball after calculations
	 * */
	private String formatDbRequest(Point p) {
		return ConfLoader.getEntry("databaseURL")+"/poi/nearest.php?lg="+p.getLongitude()+"&"+"lt="+p.getLatitude();
	}
	
	/** 
	 * \param Float lg, Float lt
	 * \return Point
	 * \brief Calculates the trajectory of the ball following a special pattern such as the weather
	 * */
	private Point applyWeather(Float lg, Float lt){
		Float neg=(Float)(float)Math.random();
		Point p;
		if(neg<0.5){
			Float neg2=(Float)(float)Math.random();
			if(neg2<0.5){
				p=new Point(lg-(neg/4),lt-(neg2/4));
			}else{
				p=new Point(lg-(neg/4),lt+(neg2/4));
			}
		}else{
			Float neg2=(Float)(float)Math.random();
			if(neg2<0.5){
				p=new Point(lg+(neg/4),lt-(neg2/4));
			}else{
				p=new Point(lg+(neg/4),lt+(neg2/4));
			}
		}
		return p;
	}
}
