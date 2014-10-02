package http;

public class Point {
	
	private Float latitude;
	private Float longitude;

	public Point(Float latitude,Float longitude){
		this.setLatitude(latitude);
		this.setLongitude(longitude);
	}

	public Float getLatitude() {
		return latitude;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public Float getLongitude() {
		return longitude;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}
	
	public Float distanceBetweenMeAnd(Point otherPoint){
		return (float) Math.sqrt(((otherPoint.getLatitude()-latitude)*(otherPoint.getLatitude()-latitude))+((otherPoint.getLongitude()-longitude)*(otherPoint.getLongitude()-longitude)));
	}
}
