package http.handlers;

import java.util.HashMap;
import com.sun.net.httpserver.HttpExchange;
import logger.Logger;

public class UsersTravelledDistances extends CustomizedHandler  {

	public UsersTravelledDistances(HashMap<String, Logger> loggers) {
		super(loggers);
	}
	
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	}
}
