package http.handlers.mobile;

import java.util.HashMap;

import com.sun.net.httpserver.HttpExchange;
import http.handlers.PostHandler;
import http.users.SetOfUsers;

public class Disconnection extends PostHandler {

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		HashMap<String,Object> map = parseUserInfo(t);
		SetOfUsers.disconnectUser((String)map.get("token"));
	}

}
