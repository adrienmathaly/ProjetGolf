/**   \author Adrien ORTOLA */
package http.handlers.mobile;

import java.io.OutputStream;
import java.util.HashMap;
import com.sun.net.httpserver.HttpExchange;
import http.handlers.PostHandler;
import http.users.SetOfUsers;

/**
 * \class EraseId
 * \brief The purpose of this class is to release the token id of a user, setting its game to over.
 * */
public class EraseId extends PostHandler {

	/** 
	 * \param HttpExchange
	 * \return void
	 * \brief Retrieves the given token id if it exists and erases it. Sends back a 404 otherwise.
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		HashMap<String,Object> map = parseJSONInfo(t);
		if(SetOfUsers.containsToken((String)map.get("token"))){
			SetOfUsers.disconnectUser((String)map.get("token"));
		    t.sendResponseHeaders(204,-1);
		}else{
			t.sendResponseHeaders(404,-1);
		}
		OutputStream os = t.getResponseBody();
		os.close();
	}

}
