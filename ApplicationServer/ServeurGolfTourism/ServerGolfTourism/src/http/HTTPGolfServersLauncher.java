package http;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;
import configuration.ConfLoader;
import logger.Logger;


public class HTTPGolfServersLauncher {


	private boolean active;
	private HTTPResponseHeaderBuilder headers;
	private HashMap<String,Logger> loggers;
	private HTTPGolfMobileServer mobileServer;
	public HTTPGolfServersLauncher() {
		ConfLoader.loadConfigFile();
		launchLoggers();
		loggers.get("Events").addLogToBeWritten(ConfLoader.getEntry("onStartMsg"));
		active=true;
		headers=new HTTPResponseHeaderBuilder(new File(ConfLoader.getEntry("headersDirectory")));
		mobileServer = new HTTPGolfMobileServer(loggers,"[MOBILE]", ConfLoader.getEntry("serverPortMobile"));
		mobileServer.launchMePlease();
		while(active){
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		killEverything();
	}
	
	private void killEverything(){
		mobileServer.killMePlease();
		killLoggers();
	}
	
	private void launchLoggers(){
		loggers = new HashMap<String,Logger>();
		loggers.put(ConfLoader.getEntry("loggerEventsName"), new Logger(ConfLoader.getEntry("loggerEventsName"), ConfLoader.getEntry("loggerEventsPath"),10));
		loggers.put(ConfLoader.getEntry("loggerErrorsName"), new Logger(ConfLoader.getEntry("loggerErrorsName"), ConfLoader.getEntry("loggerErrorsPath"),10));
		for(Entry<String,Logger> e : loggers.entrySet()){
			Thread t = new Thread(e.getValue());
			t.start();
		}
	}
	
	private void killLoggers(){
		for(Entry<String,Logger> e : loggers.entrySet()){
			e.getValue().stopLogger();
		}
	}
}