from django.db import models
from django.contrib.auth.models import User


class HousingOffer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.jpg')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)  
    number_of_rooms = models.PositiveSmallIntegerField()   
    is_furnished = models.BooleanField()    
    is_pet_friendly = models.BooleanField() 
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title
    

class HousingRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    housing_offer = models.ForeignKey(HousingOffer, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return f"Request from {self.user.username} for {self.housing_offer.title}"



class Message(models.Model):
    request = models.ForeignKey(HousingRequest, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Message from {self.user.username} at {self.timestamp}"