package http.handlers;

import java.util.HashMap;
import com.sun.net.httpserver.HttpExchange;
import logger.Logger;

public class NearestPOIFromCoords extends CustomizedHandler {

	public NearestPOIFromCoords(HashMap<String, Logger> loggers) {
		super(loggers);
	}

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	}
}
