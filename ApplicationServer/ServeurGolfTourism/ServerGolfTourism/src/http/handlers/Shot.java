package http.handlers;

import java.util.HashMap;
import com.sun.net.httpserver.HttpExchange;
import logger.Logger;

public class Shot extends CustomizedHandler{

	public Shot(HashMap<String, Logger> loggers) {
		super(loggers);
	}

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	}

}