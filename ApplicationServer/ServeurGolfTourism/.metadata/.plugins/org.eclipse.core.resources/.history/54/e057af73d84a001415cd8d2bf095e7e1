package http;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.HashMap;
import logger.Logger;
import com.sun.net.httpserver.HttpServer;

abstract class HTTPGolfServer{

	private HttpServer server;
	private HashMap<String,Logger> loggers;
	private String serverName;
	
	public HTTPGolfServer(HashMap<String,Logger> loggers, String name, String port){
		this.serverName=name;
		this.loggers=loggers;
		try {
			server = HttpServer.create(new InetSocketAddress(Integer.parseInt(port)), 0);
			createMultiEntriesContext();
		    server.setExecutor(null);
		} catch (NumberFormatException | IOException e) {
			e.printStackTrace();
		}
	}
	
	public HttpServer getServer() {
		return server;
	}

	public void setServer(HttpServer server) {
		this.server = server;
	}

	public HashMap<String, Logger> getLoggers() {
		return loggers;
	}

	public void setLoggers(HashMap<String, Logger> loggers) {
		this.loggers = loggers;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public void launchMePlease(){
	    server.start();
	    loggers.get("Events").addLogToBeWritten(serverName+" - Server launched");
	}
	
	public void killMePlease(){
		server.stop(0);
	}
	
	protected abstract void createMultiEntriesContext();
}
