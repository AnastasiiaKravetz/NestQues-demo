from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from nestquest.models import HousingOffer, HousingRequest, HousingRequest
from nestquest.serializers import HousingRequestSerializer, HousingRequestSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def getMyRequests(request):
    if not request.user.is_authenticated:
        return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)
    
    user = request.user
    
    housingrequests = HousingRequest.objects.filter(user=user)
    
    page = request.query_params.get('page')
    paginator = Paginator(housingrequests, 2)

    try:
        housingrequests = paginator.page(page)
    except PageNotAnInteger:
        housingrequests = paginator.page(1)
    except EmptyPage:
        housingrequests = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = HousingRequestSerializer(housingrequests, many=True)
    return Response({'requests': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getOfferRequests(request):

    housing_offer = request.query_params.get('housing_offer')
    
    housingrequests = HousingRequest.objects.filter(housing_offer=housing_offer)
    
    page = request.query_params.get('page')
    paginator = Paginator(housingrequests, 2)

    try:
        housingrequests = paginator.page(page)
    except PageNotAnInteger:
        housingrequests = paginator.page(1)
    except EmptyPage:
        housingrequests = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = HousingRequestSerializer(housingrequests, many=True)
    return Response({'requests': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getRequest(request, pk):
    
    housingrequest = HousingRequest.objects.get(_id=pk)
    serializer = HousingRequestSerializer(housingrequest, many=False)
    return Response(serializer.data)




@api_view(['DELETE'])
def deleteRequest(request, pk):
    
    housingrequest = HousingRequest.objects.get(_id=pk)
    housingrequest.delete()
    return Response('Deleted')


@api_view(['POST'])
def createRequest(request):
    try:
        data = request.data
        user = request.user
        housing_offer_id = int(data['housing_offer']) 
        housing_offer = HousingOffer.objects.get(pk=housing_offer_id)  
        housingrequest = HousingRequest.objects.create(
            user=user,
            housing_offer=housing_offer 
        )

        serializer = HousingRequestSerializer(housingrequest, many=False)
        return Response(serializer.data)
    except HousingOffer.DoesNotExist:
        return Response("HousingOffer with the provided ID does not exist.", status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)





@api_view(['PUT'])
def updateRequest(request, pk):
    try:
        data = request.data
        housingrequest = HousingRequest.objects.get(_id=pk)

        housingrequest.housing_offer_id = data['offer_id']

        housingrequest.save()

        serializer = HousingRequestSerializer(request, many=False)
        return Response(serializer.data)
    except HousingRequest.DoesNotExist:
        return Response('Request not found', status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)



