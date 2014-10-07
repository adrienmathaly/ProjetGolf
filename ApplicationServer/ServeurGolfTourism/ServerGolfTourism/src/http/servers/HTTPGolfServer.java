package http.servers;

import java.io.IOException;
import java.net.InetSocketAddress;
import logger.Logger;
import com.sun.net.httpserver.HttpServer;
import configuration.ConfLoader;

abstract class HTTPGolfServer{

	private HttpServer server;
	private String serverName;
	
	public HTTPGolfServer(String name, String port){
		this.serverName=name;
		try {
			server = HttpServer.create(new InetSocketAddress(Integer.parseInt(port)), 0);
			createMultiEntriesContext();
		    server.setExecutor(null);
		} catch (NumberFormatException | IOException e) {
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), this.getClass().getName()+ " - " +e.getStackTrace()[0].getLineNumber()+  " - " +  e.toString());
		}
	}
	
	public HttpServer getServer() {
		return server;
	}

	public void setServer(HttpServer server) {
		this.server = server;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public void launchMePlease(){
	    server.start();
	    Logger.addLogToBeWritten("Events",serverName+" - Server launched");
	}
	
	public void killMePlease(){
		server.stop(0);
	    Logger.addLogToBeWritten("Events",serverName+" - Server stopped");
	}
	
	protected abstract void createMultiEntriesContext();
}
