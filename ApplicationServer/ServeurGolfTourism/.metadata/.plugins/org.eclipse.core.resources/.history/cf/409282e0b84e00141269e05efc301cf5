package http.servers;

import http.handlers.mobile.BindTokenId;
import http.handlers.mobile.EraseId;
import http.handlers.mobile.Shot;

public class HTTPGolfMobileServer extends HTTPGolfServer{

	public HTTPGolfMobileServer(String name ,String port) {
		super(name, port);
	}

	@Override
	protected void createMultiEntriesContext() {
		getServer().createContext("/token", new BindTokenId());
		getServer().createContext("/shot", new Shot());
		getServer().createContext("/eraseid", new EraseId());
	}
}
