from django.db import models
from django.contrib.auth.models import User

class HousingOffer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)  
    number_of_rooms = models.PositiveSmallIntegerField()   
    is_furnished = models.BooleanField(default=False)     
    is_pet_friendly = models.BooleanField(default=False)  
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

class HousingRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    desired_location = models.CharField(max_length=100)
    max_price = models.DecimalField(max_digits=10, decimal_places=2)
    min_bedrooms = models.PositiveSmallIntegerField(default=1)
    min_bathrooms = models.PositiveSmallIntegerField(default=1)
    move_in_date = models.DateField(null=True, blank=True) 
    is_furnished_desired = models.BooleanField(default=False) 
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
<<<<<<< Updated upstream
        return self.title
=======
        return f"Request from {self.user.username} "#for {self.housing_offer.title}



class Message(models.Model):
    request = models.ForeignKey(HousingRequest, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Message from {self.user.username} at {self.created_at}"
    
class HousingOfferImage(models.Model):
    housing_offer = models.ForeignKey(HousingOffer, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='housing_offer_images/')

    def __str__(self):
        return str(self.housing_offer)
>>>>>>> Stashed changes
