package http.servers;

import http.handlers.supervision.AllTheData;
import http.handlers.supervision.AmountOfUsersFromDaBeginnin;
import http.handlers.supervision.BestDistance;
import http.handlers.supervision.NumberOfConnected;
import http.handlers.supervision.TotalOfAllDistances;
import http.handlers.supervision.UsersLastKnownLocations;
import http.handlers.supervision.UsersTravelledDistances;

public class HTTPGolfSupervisionServer extends HTTPGolfServer {

	public HTTPGolfSupervisionServer(String name, String port) {
		super(name, port);
	}

	@Override
	protected void createMultiEntriesContext() {
		getServer().createContext("/users/lastKnownLocations", new UsersLastKnownLocations());
		getServer().createContext("/users/travelledDistances", new UsersTravelledDistances());
		getServer().createContext("/amountOfUsers", new AmountOfUsersFromDaBeginnin());
		getServer().createContext("/totalDistances", new TotalOfAllDistances());
		getServer().createContext("/numberOfConnected", new NumberOfConnected());
		getServer().createContext("/bestDistance", new BestDistance());
		getServer().createContext("/all", new AllTheData());
	}
}
