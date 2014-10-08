/**   \author Adrien ORTOLA */
package http.handlers.supervision;

import http.handlers.CustomizedHandler;
import http.users.SetOfUsers;
import java.io.OutputStream;
import json.JSONBuilder;
import com.sun.net.httpserver.HttpExchange;

/**
 * \class AmountOfUsersFromDaBeginnin
 * \brief Extends CustomizedHandler.
 *  The purpose of this class is to get the number of all users from the beginning. This includes the non-active ones.
 * */
public class AmountOfUsersFromDaBeginnin extends CustomizedHandler  {

	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief Gets and returns the amount of users to a supervision client.
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("amountOfUsers",SetOfUsers.amountOfUsers());
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
}
