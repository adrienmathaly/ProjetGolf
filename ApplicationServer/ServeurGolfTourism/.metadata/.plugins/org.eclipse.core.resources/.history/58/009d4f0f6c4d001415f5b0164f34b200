package http.handlers.mobile;

import http.database.DatabaseManager;
import http.handlers.CustomizedHandler;
import java.io.OutputStream;
import com.sun.net.httpserver.HttpExchange;
import configuration.ConfLoader;

public class NearestPOIFromCoords extends CustomizedHandler {

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		
		DatabaseManager dbm = new DatabaseManager(formatDbRequest(t));
		dbm.connect("GET");
		String response = dbm.getResponse();
		t.getResponseHeaders().add("Content-type", "json;charset=utf-8");
		t.sendResponseHeaders(200, response.length());
		OutputStream os = t.getResponseBody();
		os.write(response.getBytes());
		os.close();
	}

	private String formatDbRequest(HttpExchange t) {
		String[] s = t.getRequestURI().toString().split("/");
		return ConfLoader.getEntry("databaseURL") + "/" + s[s.length - 2] + "/" + s[s.length - 1].replace("?", ".php?");
	}
	
	private boolean isRequestValid(HttpExchange t){
		return t.getRequestURI().toString().matches("http://172.31.1.191:8081/poi/nearest?lg=lt=");
	}
}
