/**   \author Adrien ORTOLA */
package http.handlers.supervision;

import java.io.OutputStream;
import json.JSONBuilder;
import com.sun.net.httpserver.HttpExchange;
import http.handlers.CustomizedHandler;
import http.users.SetOfUsers;

/**
 * \class BestDistance
 * \brief Extends CustomizedHandler.
 *  The purpose of this class is to get and return the best traveled distance among all the users.
 * */
public class BestDistance extends CustomizedHandler {

	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief gets and returns to a supervision client the best traveled distance among all the users
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("bestDistance",SetOfUsers.getBestDistance());
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}

}
