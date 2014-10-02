package http;

public class User {

	
	private boolean connected;
	private boolean fullyCreated;
	private float longitude;
	private float latitude;
	private float travelledDistance;
	
	public User(){
		this.setConnected(true);
		this.setFullyCreated(false);
	}

	public boolean isConnected() {
		return connected;
	}

	public void setConnected(boolean connected) {
		this.connected = connected;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getTravelledDistance() {
		return travelledDistance;
	}

	public void setTravelledDistance(float travelledDistance) {
		this.travelledDistance = travelledDistance;
	}
	
	public void setLocation(Point p){
		this.setLatitude(p.getLatitude());
		this.setLongitude(p.getLongitude());
	}
	
	public Point getLocation(){
		return new Point(getLatitude(),getLongitude());
	}

	public boolean isFullyCreated() {
		return fullyCreated;
	}

	public void setFullyCreated(boolean fullyCreated) {
		this.fullyCreated = fullyCreated;
	}
}
