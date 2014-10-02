package http.handlers;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;

import logger.Logger;

import com.sun.net.httpserver.HttpExchange;

public class AmountOfConnected extends CustomizedHandler{

	public AmountOfConnected(HashMap<String, Logger> loggers) {
		super(loggers);
	}

	@Override
	public void handle(HttpExchange t) throws IOException {
	      String response = "";
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}

}
