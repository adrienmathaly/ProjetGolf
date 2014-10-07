package http.handlers.mobile;

import java.io.OutputStream;
import java.util.HashMap;

import com.sun.net.httpserver.HttpExchange;

import http.handlers.PostHandler;
import http.users.SetOfUsers;

public class EraseId extends PostHandler {

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		HashMap<String,Object> map = parseUserInfo(t);
		SetOfUsers.disconnectUser((String)map.get("token"));
	    t.sendResponseHeaders(204,-1);
		OutputStream os = t.getResponseBody();
		os.close();
	}

}
