package http.handlers.mobile;

import http.handlers.CustomizedHandler;
import http.users.Point;
import http.users.SetOfUsers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.sun.net.httpserver.HttpExchange;

public class Shot extends CustomizedHandler{

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
		HashMap<String,Object> map = parseUserInfo(t);
		if(!SetOfUsers.isUserFullyCreated((String)map.get("token"))){
			SetOfUsers.setFirstLocationOf((String)map.get("token"),new Point((Float)(float)(double)map.get("userLt"),(Float)(float)(double)(map.get("userLg"))));
		}
		SetOfUsers.updateUserLocation((String)map.get("token"), new Point((Float)(float)(double)(map.get("ballLt")),(Float)(float)(double)(map.get("ballLg"))));
	}

	private JSONObject parseUserInfo(HttpExchange t) throws IOException, ParseException {
		InputStreamReader isr = new InputStreamReader(t.getRequestBody());
		BufferedReader bfr = new BufferedReader(isr);
		return(JSONObject) new JSONParser().parse(bfr);
	}
}
