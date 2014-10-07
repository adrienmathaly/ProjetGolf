package http;

import http.servers.HTTPGolfMobileServer;
import http.servers.HTTPGolfSupervisionServer;
import http.servers.HTTPResponseHeaderBuilder;
import http.users.SetOfUsers;
import java.io.File;
import configuration.ConfLoader;
import logger.Logger;

public class HTTPGolfServersLauncher {

	private boolean active;
	private HTTPResponseHeaderBuilder headers;
	private HTTPGolfMobileServer mobileServer;
	private HTTPGolfSupervisionServer supvServer;

	public HTTPGolfServersLauncher() {
		ConfLoader.loadConfigFile();
		launchLoggers();
		SetOfUsers.prepareUsers();
		Logger.addLogToBeWritten("Events",ConfLoader.getEntry("onStartMsg"));
		active=true;
		//headers=new HTTPResponseHeaderBuilder(new File(ConfLoader.getEntry("headersDirectory")));
		mobileServer = new HTTPGolfMobileServer("[MOBILE]", ConfLoader.getEntry("serverPortMobile"));
		mobileServer.launchMePlease();
		supvServer = new HTTPGolfSupervisionServer("[SUPERVISION]", ConfLoader.getEntry("serverPortSupervision"));
		supvServer.launchMePlease();
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
		supvServer.killMePlease();
		Logger.addLogToBeWritten("Events",ConfLoader.getEntry("onStopMsg"));
		killLoggers();
	}
	
	private void launchLoggers(){
		Logger.prepareLoggers();
		Logger.createLogger(new Logger(ConfLoader.getEntry("loggerEventsName"), ConfLoader.getEntry("loggerEventsPath"),10));
		Logger.createLogger(new Logger(ConfLoader.getEntry("loggerErrorsName"), ConfLoader.getEntry("loggerErrorsPath"),10));
		Logger.startAllLoggers();
	}
	
	private void killLoggers(){
		Logger.killAllloggers();
	}
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
}
