package http;

import http.handlers.BindTokenId;
import http.handlers.NearestPOIFromCoords;
import http.handlers.Shot;

import java.util.HashMap;

import logger.Logger;

public class HTTPGolfMobileServer extends HTTPGolfServer{

	public HTTPGolfMobileServer(HashMap<String, Logger> loggers, String name ,String port) {
		super(loggers, name, port);
	}

	@Override
	protected void createMultiEntriesContext() {
		getServer().createContext("/token", new BindTokenId(getLoggers()));
		getServer().createContext("/poi/nearest", new NearestPOIFromCoords(getLoggers()));
		getServer().createContext("/shot", new Shot(getLoggers()));
	}
}
