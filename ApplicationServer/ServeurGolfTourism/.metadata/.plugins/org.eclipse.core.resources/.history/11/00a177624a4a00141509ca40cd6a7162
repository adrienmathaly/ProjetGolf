package http.handlers;

import java.util.HashMap;

import logger.Logger;

import com.sun.net.httpserver.HttpHandler;

abstract class CustomizedHandler implements HttpHandler{

	private HashMap<String,Logger> loggers;
	
	public CustomizedHandler(HashMap<String,Logger> loggers){
		this.setLoggers(loggers);
	}

	public HashMap<String,Logger> getLoggers() {
		return loggers;
	}

	public void setLoggers(HashMap<String,Logger> loggers) {
		this.loggers = loggers;
	}
	
}
