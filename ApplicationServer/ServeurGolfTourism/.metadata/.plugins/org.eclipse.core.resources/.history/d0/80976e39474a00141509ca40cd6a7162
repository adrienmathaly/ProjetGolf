package http.handlers;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.UUID;

import logger.Logger;

import com.sun.net.httpserver.HttpExchange;

public class BindTokenId extends CustomizedHandler {

	public BindTokenId(HashMap<String, Logger> loggers) {
		super(loggers);
	}

	@Override
	public void handle(HttpExchange t) throws IOException {
		  this.getLoggers().get("Events").addLogToBeWritten("[Mobile] - Handling Request");
	      String response = generateUID();
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	      this.getLoggers().get("Events").addLogToBeWritten("[Mobile] - Request Handled");
	}
	
	private String generateUID(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

}
