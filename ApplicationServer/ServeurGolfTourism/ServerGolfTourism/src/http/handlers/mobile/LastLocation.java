/**   \author Adrien ORTOLA */
package http.handlers.mobile;

import java.io.OutputStream;
import org.json.simple.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import http.handlers.CustomizedHandler;
import http.users.Point;
import http.users.SetOfUsers;

/**
 * \class LastLocation
 * \brief The purpose of this class is to return the last location of a given user, providing that he/she started a game. (This matches the closest POI of a ball)
 * */
public class LastLocation extends CustomizedHandler {

	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief verify of the user exists and that he/she is currently in a game. Then, retrieve its previous location in order to provide the client with these coordinates.
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		String token = parseToken(t);
		String response="";
		if(SetOfUsers.containsToken(token) && SetOfUsers.isUserFullyCreated(token)){
			JSONObject jsono = new JSONObject();
			Point p = SetOfUsers.getLastLocationOf(token);
			jsono.put("lt", p.getLatitude());
			jsono.put("lg", p.getLongitude());
		    response = jsono.toJSONString();
		    t.sendResponseHeaders(200, response.length());
		}else{
			t.sendResponseHeaders(404,-1);
		}
        OutputStream os = t.getResponseBody();
        os.write(response.getBytes());
        os.close();	
	}
	
	/** 
	 * \param HtttpExchange t
	 * \return String
	 * \brief Parses the token id out of the query arguments
	 * */
	private String parseToken(HttpExchange t){
		String req = t.getRequestURI().getQuery();
		return req=req.split("token=")[1];
	}
}
