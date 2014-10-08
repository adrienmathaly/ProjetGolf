/**   \author Adrien ORTOLA */
package http.handlers.supervision;

import http.handlers.CustomizedHandler;
import http.users.SetOfUsers;
import java.io.OutputStream;
import json.JSONBuilder;
import com.sun.net.httpserver.HttpExchange;

/**
 * \class NumberOfConnected
 * \brief Extends CustomizedHandler.
 *  The purpose of this class is to get and return the number of active games.
 * */
public class NumberOfActiveGames extends CustomizedHandler{

	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief gets and returns the total number of active games
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("currentGames",SetOfUsers.numberOfActiveGames());
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
}
