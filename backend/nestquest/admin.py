from django.contrib import admin
<<<<<<< Updated upstream
from .models import HousingOffer, HousingRequest

admin.site.register(HousingOffer)
admin.site.register(HousingRequest)
=======
from .models import HousingOffer, HousingRequest, Message,HousingOfferImage

admin.site.register(HousingOffer)
admin.site.register(HousingRequest)
admin.site.register(Message)
admin.site.register(HousingOfferImage)
>>>>>>> Stashed changes
