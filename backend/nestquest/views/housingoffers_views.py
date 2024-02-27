from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from nestquest.models import HousingOffer, HousingOfferImage
from nestquest.serializers import HousingOfferSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def getOffers(request):

    query = request.query_params.get('keyword', '')
    if query == None:
        query = ''
    
    offers = HousingOffer.objects.filter(
        title__icontains=query).order_by('-created_at') 
    
    page = request.query_params.get('page')
    paginator = Paginator(offers, 10)

    try:
        offers = paginator.page(page)
    except PageNotAnInteger:
        offers = paginator.page(1)
    except EmptyPage:
        offers = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)

    serializer = HousingOfferSerializer(offers, many=True)
    return Response({'offers': serializer.data, 'page': page, 'pages': paginator.num_pages})



@api_view(['GET'])
def getOffer(request, pk):
    
    offer = HousingOffer.objects.get(_id=pk)
    serializer = HousingOfferSerializer(offer, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
def deleteOffer(request, pk):
    
    offer = HousingOffer.objects.get(_id=pk)
    offer.delete()
    return Response('Deleted')







@api_view(['POST'])
def createOffer(request):
    try:
        data = request.data
        user = request.user
        print(user)
        if 'title' not in data:
            return Response("Title is required", status=status.HTTP_400_BAD_REQUEST)
        print(request.FILES.getlist('images'))
        offer = HousingOffer.objects.create(
            user=user,
            image= request.FILES.getlist('images')[0],
            title=data['title'],
            price=data['price'],
            location=data['location'],
            is_furnished=True if data['is_furnished'] == "true" else False,
            number_of_rooms=data['number_of_rooms'],
            is_pet_friendly=True if data['is_pet_friendly'] == "true" else False,
            description=data['description']
        )
        images = request.FILES.getlist('images')
        for image in images:
            HousingOfferImage.objects.create(housing_offer=offer, image=image)


        serializer = HousingOfferSerializer(offer, many=False)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)





@api_view(['PUT'])
def updateOffer(request, pk):
    try:
        data = request.data
        offer = HousingOffer.objects.get(_id=pk)
        offer.title = data['title']
        offer.price = data['price']
        offer.is_furnished = data['is_furnished']
        offer.is_pet_friendly =data['is_pet_friendly']
        offer.location = data['location']
        offer.number_of_rooms = data['number_of_rooms']
        offer.description = data['description']
        print(offer.is_furnished)
        offer.save()
        
        serializer = HousingOfferSerializer(offer, many=False)
        return Response(serializer.data)
    except HousingOffer.DoesNotExist:
        return Response('Offer not found', status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def uploadImage(request):
    try:
        data = request.data
        offer_id = data.get('offer_id')
        offer = get_object_or_404(HousingOffer, _id=offer_id)

        images = request.FILES.getlist('images')
        for image in images:
            HousingOfferImage.objects.create(housing_offer=offer, image=image)

        return Response('Images were uploaded successfully')
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


